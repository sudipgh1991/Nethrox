# Stage 1: Build the React app
FROM node:22 AS builder

WORKDIR /app/frontend

# Install dependencies first (layer caching)
COPY frontend/package.json ./
RUN npm install

# Copy source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve the built app
FROM node:22-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 3000

CMD serve frontend/dist -s -l tcp://0.0.0.0:$PORT
