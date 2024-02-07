# Use official Node.js image as base
FROM node:alpine

# Set working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app
CMD ["npm", "run", "dev"]

