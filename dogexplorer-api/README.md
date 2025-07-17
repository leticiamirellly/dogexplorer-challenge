# DogExplorer API  
Fastify 4 · TypeScript · PostgreSQL · Redis

BFF that powers the **DogExplorer** SPA.

| Feature | Stack |
| ------- | ----- |
| HTTP    | Fastify 4 + `@fastify/cors` |
| DB      | PostgreSQL 15 (`favorites` table) |
| Cache   | Redis 7 (cross-pod) + in-process LRU |
| Tests   | Vitest 3 |
| Build   | plain `tsc` → lean Node 20-alpine image |


## ⚡ Quick start

```sh
npm i
npm run dev 
```

# tests
```sh
npm run test
npm run coverage  
```