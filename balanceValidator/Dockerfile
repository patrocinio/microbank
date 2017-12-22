FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY src/ /usr/src/app

EXPOSE 80
RUN npm install
CMD ["npm", "start"]
