FROM node:alpine

RUN apk add --no-cache nginx
WORKDIR /app

COPY nginx.conf /etc/nginx/nginx.conf
COPY client/dist/* /var/www/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
