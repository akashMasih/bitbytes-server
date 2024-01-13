# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
# Install dependencies based on the preferred package manager
COPY package*.json ./
# Run the application as a non-root user.
USER node

RUN npm install
# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD npm start
