# easybid-backend

## Quickstart (local Postgres)

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your local Postgres (e.g. `postgresql://user:pass@localhost:5432/easybid`).
2. Install deps and generate Prisma client:

```bash
npm install
npm run prisma:generate
```

3. Run migrations and seed data:

```bash
npm run prisma:migrate
npm run prisma:seed
```

4. Start dev server:

```bash
npm run dev
```

Server will expose GraphQL playground at `http://localhost:4000/graphql`.

## Running with Docker

A `docker-compose.yml` is available at the repo root (`easybid/docker-compose.yml`) to run Postgres + the backend in development mode.

From the `easybid` repo root run:

```bash
# build and start (dev mode uses the backend Dockerfile.dev and mounts local source)
docker compose up --build

# run migrations (in another terminal):
docker compose exec backend npm run prisma:migrate
# seed:
docker compose exec backend npm run prisma:seed
```

The backend will be available at `http://localhost:4000/graphql`.

## Running full stack (UI + Backend) with Docker

From the `easybid` repo root you can start the database, backend, and UI together:

```bash
# build and start backend + ui + db
docker compose up --build

# run migrations (in another terminal):
docker compose exec backend npm run prisma:migrate
# seed data:
docker compose exec backend npm run prisma:seed
```

The backend will be at `http://localhost:4000/graphql` and the UI dev server at `http://localhost:5173`.

## Example queries

Query bids:

```
query {
  bids(limit: 10, page: 1) {
    id
    title
    amount
    status
    createdAt
    postings {
      id
      description
      company
    }
  }
}
```

Query postings directly:

```
query {
  bidPostings(bidId: 1, limit: 10, page: 1) {
    id
    bidId
    description
    company
    images
    attributes
  }
}
```

Create bid:

```
mutation {
  createBid(input: { title: "New Job", amount: 1250.5 }) {
    id
    title
  }
}
```
