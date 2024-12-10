# Dockerfile
# Etapa de construcción
FROM node:20 AS build
WORKDIR /app
# Copiar los archivos de configuración de npm y vue
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copiar el código de la aplicación y construirla
COPY . .
RUN npm run build
# Etapa de producción (Nginx)
FROM nginx:alpine
# Copiar los archivos compilados desde la etapa de construcción a la carpeta de nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copiar configuración de Nginx (si necesitas personalizarla)
# Puedes crear un archivo personalizado de configuración en tu proyecto y copiarlo aquí
# COPY nginx.conf /etc/nginx/nginx.conf
# Exponer el puerto de Nginx
EXPOSE 80
# Comando de inicio de Nginx
CMD ["nginx", "-g", "daemon off;"]