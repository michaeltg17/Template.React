# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
ENV NPM_CONFIG_IGNORE_SCRIPTS=true
RUN npm ci --omit=dev
COPY --from=build /app/.next ./
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]