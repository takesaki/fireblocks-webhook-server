# Image for build
FROM node:23.9 as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json tsconfig.json ./
RUN npm ci

# Build app
COPY ./src ./src
RUN npm run build

# Execiution image
FROM node:23.9-slim

ENV NODE_ENV production
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

USER node
COPY --from=builder /app/dist ./dist

ENV PORT 80

CMD [ "node", "dist/index.js" ]