FROM node:latest
RUN groupmod -g 5000 node && usermod -u 5000 -g 5000 node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
USER node
COPY --chown=node:node . .
EXPOSE 9000
CMD [ "node", "src/backend/server.js" ]
