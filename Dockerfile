FROM nginx:stable-alpine

COPY ./docker/default.conf /etc/nginx/conf.d/
COPY ./docker/rewrite.conf /etc/nginx/
COPY ./docker/.htpasswd /tmp/.htpasswd

COPY ./public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]