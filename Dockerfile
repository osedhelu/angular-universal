FROM node:16.5.0-alpine3.14
WORKDIR /usr/src/frontend
COPY ./node_modules ./node_modules/
COPY ./src/ ./src/
COPY ./dist/ ./dist/

