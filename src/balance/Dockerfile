FROM node:latest
EXPOSE 80

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY latest/package.json /usr/src/app
RUN npm install
COPY latest/ /usr/src/app

CMD ["npm", "start"]
