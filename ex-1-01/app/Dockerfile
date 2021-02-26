FROM node:14

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npm ci --only=production

# Bundle app source
COPY . .

# Start the app
CMD [ "node" , "index.js"]