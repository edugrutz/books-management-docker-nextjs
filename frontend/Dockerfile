FROM node:20-alpine

WORKDIR /app

COPY codes/package.json codes/package-lock.json ./
RUN npm ci

COPY codes/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
