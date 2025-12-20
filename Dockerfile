FROM debian:stable-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl git build-essential sqlite3 unzip ca-certificates nodejs npm \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://golang.org/dl/go1.25.5.linux-amd64.tar.gz | tar -C /usr/local -xzf -
ENV PATH="/usr/local/go/bin:$PATH"

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Build frontend
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN bun install
COPY frontend/ ./
RUN bun run build

# Setup backend
WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy database setup
COPY backend/database.sql ./
RUN sqlite3 database.db < database.sql || true

# Copy backend source
COPY backend/ ./

# Build Go binary
RUN go build -o server server.go

WORKDIR /app/backend

EXPOSE 8080
CMD ["./server"]
