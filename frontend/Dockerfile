# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
ARG VITE_MOYASAR_PUBLISHABLE_KEY
ENV VITE_MOYASAR_PUBLISHABLE_KEY=$VITE_MOYASAR_PUBLISHABLE_KEY
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
