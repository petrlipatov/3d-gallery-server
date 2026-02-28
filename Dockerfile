# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production environment
FROM node:18-alpine
WORKDIR /app

# Copy built assets and dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

# Expose the port your app runs on
EXPOSE 3300

# Start the application
CMD ["npm", "start"]
