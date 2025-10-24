# Usar Nginx para servir archivos estáticos
FROM nginx:alpine

# Copiar archivos HTML estáticos al directorio de Nginx
COPY *.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css/
COPY js /usr/share/nginx/html/js/
COPY images /usr/share/nginx/html/images/

# Configuración personalizada de Nginx para HTML sin extensión
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri.html $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Nginx se ejecuta automáticamente
