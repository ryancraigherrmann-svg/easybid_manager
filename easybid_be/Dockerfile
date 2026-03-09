FROM node:20-bullseye AS builder
WORKDIR /app

# install deps
COPY package*.json ./
RUN apt-get update
# Run npm install with visible output to debug failures during build
RUN npm ci --loglevel=info

# copy and build
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:20-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm ci --production --silent

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/schema.prisma ./schema.prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/prisma.config.js ./prisma.config.js
COPY --from=builder /app/prisma.config.cjs ./prisma.config.cjs
COPY --from=builder /app/src/generated ./dist/generated

EXPOSE 4000
CMD ["node", "dist/index.js"]
