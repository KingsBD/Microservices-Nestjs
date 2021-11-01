FROM node:12-alpine

RUN mkdir -p /home/node_orders/app/node_modules && chown -R node:node /home/node_orders/app

WORKDIR /home/node_orders/app

COPY package*.json ./

USER node

RUN npm install glob rimraf

RUN npm install --only=development

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]