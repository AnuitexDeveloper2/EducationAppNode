FROM node:10


EXPOSE 4000

WORKDIR /src

ADD package src/

RUN npm install 

ADD . /src

ENTRYPOINT ["npm", "start"]
