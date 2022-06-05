FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]