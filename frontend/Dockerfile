# syntax=docker/dockerfile:1

FROM node:18-alpine AS build
WORKDIR /workspace

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM nginx:1.25-alpine AS runtime
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=build /workspace/dist/frontend ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
