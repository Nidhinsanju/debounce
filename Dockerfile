# Step 1: Use official Node image for building
FROM node:18-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Vite app for production
RUN npm run build

# Step 2: Use Nginx to serve the production build
FROM nginx:alpine

# Copy build output from previous stage to Nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
