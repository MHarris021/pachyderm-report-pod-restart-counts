FROM node:18-alpine3.16


WORKDIR /app

ADD app/ /app

RUN npm install