import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dns from 'dns/promises'

async function resolveBackendTarget(): Promise<string> {
  const env = process.env.BACKEND_URL
  const localBackend = 'http://localhost:4000'
  const dockerBackend = 'http://backend:4000'

  // If user explicitly set BACKEND_URL, trust it and return immediately
  if (env) return env

  // Try to resolve the Docker `backend` service hostname;
  // if it fails we're running outside Docker → use localhost
  try {
    const url = new URL(dockerBackend)
    await dns.lookup(url.hostname)
    return dockerBackend
  } catch {
    return localBackend
  }
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const backendTarget = await resolveBackendTarget()
  console.log(`[vite] Proxying /api and /graphql → ${backendTarget}`)

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['@apollo/client', 'graphql']
    },
    server: {
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
        '/graphql': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
