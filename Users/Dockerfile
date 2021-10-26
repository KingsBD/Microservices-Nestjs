FROM node:12-alpine

RUN mkdir -p /home/node_users/app/node_modules && chown -R node:node /home/node_users/app

WORKDIR /home/node_users/app

COPY package*.json ./

USER node

RUN npm install glob rimraf

RUN npm install --only=development

RUN npm run build

COPY --chown=node:node . .

EXPOSE 3002

CMD ["node", "dist/main"]