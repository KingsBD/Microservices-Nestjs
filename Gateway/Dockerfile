FROM node:12-alpine

RUN mkdir -p /home/node_gateway/app/node_modules && chown -R node:node /home/node_gateway/app

WORKDIR /home/node_gateway/app

COPY package*.json ./
COPY ./nest-cli.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm","run","start" ]