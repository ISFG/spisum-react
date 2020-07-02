FROM nginx:alpine

COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY build/ .