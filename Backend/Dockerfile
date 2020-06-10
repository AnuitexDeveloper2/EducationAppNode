FROM node:10-alpine

RUN mkdir -p /home/node/app/dist/node_modules && chown -R node:node /home/node/app/dist

WORKDIR /home/node/app/dist

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "dist/index.js" ]