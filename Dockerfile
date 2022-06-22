FROM node:18-alpine

LABEL maintainer="BielefeldJ"
LABEL description="JimmyTsChatbot Docker"

WORKDIR /bot

COPY package*.json ./
RUN npm install

#copy bot sourcecode
COPY . .

#create volume for message files
VOLUME /bot/messages

#create dummy config. Needs to be mounted in docker compose!
RUN touch config.js

CMD [ "node", "grandpajimmy.js" ]