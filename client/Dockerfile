FROM node:alpine

RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

CMD ["pm2-runtime", "start", "npm", "--name", "frontend", "--", "start"]
