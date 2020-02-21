FROM node
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /src/

EXPOSE 3000

WORKDIR /src/

ADD package.json /src/

RUN npm install --production

ADD . /src/

ENTRYPOINT ["npm", "run", "dev"]
