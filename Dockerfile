FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
COPY . .

RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app

RUN npm install -g http-server@^14

COPY --from=build /app/dist ./dist

ENV PORT=80
EXPOSE 80

CMD ["http-server", "dist", "-p", "80", "-c-1", "--gzip", "-s"]
