# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 node:16.16.0

COPY ./. /app

RUN npm install --force -g yarn

WORKDIR /app
RUN yarn install \
    && yarn run build
ENTRYPOINT yarn run migrations \
            && yarn run prod

EXPOSE 3000
