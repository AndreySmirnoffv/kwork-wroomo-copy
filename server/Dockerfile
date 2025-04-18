FROM node:alpine

WORKDIR /app

COPY . .

RUN npm run build

COPY dist/* /var/www/html