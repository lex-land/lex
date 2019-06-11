FROM node:latest

WORKDIR /data/www

COPY . .

CMD [ "npm", "start" ]
