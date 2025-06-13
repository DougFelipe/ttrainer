# Etapa 1: build com Node
FROM node:20-alpine as builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Etapa 2: imagem final para servir a aplicação
FROM nginx:alpine

# Copia o build para a pasta do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Etapa 3: 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
