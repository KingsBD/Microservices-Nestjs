FROM node:12-alpine

RUN mkdir -p /home/node_auth/app/node_modules && chown -R node:node /home/node_auth/app

WORKDIR /home/node_auth/app

COPY package*.json ./

USER node

RUN npm install glob rimraf

RUN npm install --only=development

RUN npm run build

COPY --chown=node:node . .

EXPOSE 3003

CMD ["node", "dist/main"]