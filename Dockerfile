# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and configurations we need
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built artifacts from the builder phase
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./

# Expose the port that Next.js will run on
EXPOSE 3000

# Define the command to run the Next.js application
CMD ["npm", "start"]