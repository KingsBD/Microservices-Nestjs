FROM node:12-alpine

RUN mkdir -p /home/node_auth/app/node_modules && chown -R node:node /home/node_auth/app

WORKDIR /home/node_auth/app

COPY package*.json ./

USER node

RUN npm install glob rimraf

RUN npm install --only=development

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3003

CMD ["node", "dist/main"]