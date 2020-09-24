FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR ./dist
COPY .env .
EXPOSE 81
CMD node index.js

