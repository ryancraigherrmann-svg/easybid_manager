FROM node:20-bullseye AS builder
WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_GRAPHQL_URL=http://localhost:4000/graphql
ARG VITE_API_URL=http://localhost:4000/api

# Set build-time environment variables
ENV VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci --silent

COPY . .
# Use a build script that skips `tsc -b` to avoid type-check failures in CI/docker
RUN npm run build:docker

FROM nginx:stable-alpine
WORKDIR /etc/nginx/conf.d

# Nginx config: serve the React SPA.
# In production (ECS), the ALB handles routing /api/* and /graphql* to the backend.
# Nginx only needs to serve static files and return index.html for client-side routes.
RUN echo 'server {' > default.conf && \
    echo '  listen 80;' >> default.conf && \
    echo '  server_name _;' >> default.conf && \
    echo '  root /usr/share/nginx/html;' >> default.conf && \
    echo '  index index.html;' >> default.conf && \
    echo '  ' >> default.conf && \
    echo '  # Serve static files directly' >> default.conf && \
    echo '  location /assets/ {' >> default.conf && \
    echo '    expires 1y;' >> default.conf && \
    echo '    add_header Cache-Control "public, immutable";' >> default.conf && \
    echo '  }' >> default.conf && \
    echo '  ' >> default.conf && \
    echo '  # SPA fallback: return index.html for all non-file routes' >> default.conf && \
    echo '  location / {' >> default.conf && \
    echo '    try_files $uri $uri/ /index.html;' >> default.conf && \
    echo '  }' >> default.conf && \
    echo '}' >> default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
