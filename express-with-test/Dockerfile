# Stage 1: Build the application
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the port your Express app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "prod"]
