# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

RUN npm ci --omit=dev --ignore-scripts
RUN npm ci --omit=dev
COPY --from=build /app/.next ./
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
