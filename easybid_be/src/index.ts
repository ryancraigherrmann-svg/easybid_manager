import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';

import { typeDefs } from './schema';
import { resolvers } from './resolvers/bidResolver';
import { prisma } from './prisma';

dotenv.config();

// Parse CORS origins from environment variable
const getCorsOrigins = (): string[] => {
  const corsEnv = process.env.CORS_ORIGINS || 'http://localhost:5173';
  return corsEnv.split(',').map(origin => origin.trim());
};

async function start() {
  const app = express();
  const corsOrigins = getCorsOrigins();
  
  app.use(express.json());
  app.use(cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  console.log('CORS configured for origins:', corsOrigins);
  console.log('prisma available at startup?', !!prisma);

  // Health check endpoint — used by ALB target group to verify the service is alive
  // Config reference: infrastructure/cloudformation/03-alb.yml → BackendTargetGroup.HealthCheckPath
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Helper: extract user from JWT and load full profile for GraphQL context
  const buildContext = async (req: any) => {
    const auth = req.headers?.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return { prisma, user: null };
    const token = auth.slice('Bearer '.length).trim();
    const { verifyToken } = await import('./utils/jwt');
    const payload = verifyToken<{ userId: number; email: string }>(token);
    if (!payload || !payload.userId) return { prisma, user: null };

    try {
      const dbUser = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: { company: true },
      });
      if (!dbUser) return { prisma, user: null };

      const displayName = dbUser.firstName || dbUser.lastName
        ? `${dbUser.firstName ?? ''} ${dbUser.lastName ?? ''}`.trim()
        : dbUser.email;

      // For admins, load all company member emails for visibility filtering
      let companyEmails: string[] = [dbUser.email];
      if (dbUser.isAdmin && dbUser.companyId) {
        const members = await prisma.user.findMany({
          where: { companyId: dbUser.companyId },
          select: { email: true },
        });
        companyEmails = members.map((m: any) => m.email);
      }

      return {
        prisma,
        user: {
          userId: dbUser.id,
          email: dbUser.email,
          companyId: dbUser.companyId,
          companyName: dbUser.company?.name ?? null,
          isAdmin: dbUser.isAdmin ?? false,
          displayName,
          companyEmails,
        },
      };
    } catch (e) {
      console.error('Error building GraphQL context:', e);
      return { prisma, user: null };
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => buildContext(req),
    cache: "bounded"
  });

  await server.start();
  server.applyMiddleware({ app });

  // REST routes
  const jobRoutes = await import('./routes/jobRoutes');
  app.use('/api', jobRoutes.default || jobRoutes);
  const authRoutes = await import('./routes/authRoutes');
  app.use('/api', authRoutes.default || authRoutes);
  const companyRoutes = await import('./routes/companyRoutes');
  app.use('/api', companyRoutes.default || companyRoutes);

  const port = process.env.PORT || 4000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`GraphQL server running at http://0.0.0.0:${port}${server.graphqlPath}`);
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
