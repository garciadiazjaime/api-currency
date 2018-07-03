FROM node:carbon

ADD package.json /tmp/package.json

RUN cd /tmp && npm install

RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN cd /usr/src/app && npm run build

EXPOSE 3030

CMD [ "node", "./dist/server.js" ]
