# TODO: 提供Docker镜像方便整体的部署
FROM node:latest

WORKDIR /app

COPY . .

RUN npx yarn

CMD [ "npm", "start" ]

EXPOSE 3000
