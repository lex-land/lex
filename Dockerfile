# TODO: 提供Docker镜像方便整体的部署
FROM node:latest

WORKDIR /app

COPY ./build ./build
COPY ./static ./static
COPY ./package.json ./package.json
COPY ./next.config.js ./next.config.js
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./tsconfig.json ./tsconfig.json

RUN npx yarn

CMD [ "npm", "start" ]

EXPOSE 3000
