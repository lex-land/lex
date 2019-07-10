# TODO: 提供Docker镜像方便整体的部署
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g yarn

RUN yarn

CMD [ "npm", "start" ]

EXPOSE 3000
