# DogExplorer — Full-Stack Monorepo

Vue 3 **frontend** + Fastify 4 **backend**, orchestrated by **Docker Compose**.  
Explore dog breeds, mark favorites (stored in PostgreSQL, cached in Redis) and enjoy instant image loading via SWR.


## Structure

├── frontend # Vue 3 • Vite • Pinia • Vitest
├── backend # Fastify 4 • TypeScript • Postgres • Redis • Vitest
└── docker-compose.yml


## ⚡ Quick Start


# spin up whole stack (SPA → http://localhost, API → http://localhost:3000)

```sh
docker compose up -d --build
```sh

# one-time install (npm workspaces)
npm install

# hot-reload frontend
npm --workspace=frontend run dev

# hot-reload backend
npm --workspace=backend run dev

npm --workspace=frontend run test      # UI + contract
npm --workspace=backend  run test      # unit + contract