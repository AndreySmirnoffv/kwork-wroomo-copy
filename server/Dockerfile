FROM node:alpine

RUN npm install -g pm2
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 8000

CMD ["pm2-runtime", "dist/index.js", "--name", "backend"]
