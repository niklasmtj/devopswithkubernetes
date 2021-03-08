FROM node:14
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . . 

# Change everything to node user
RUN chown -R node:node .
USER node
RUN npm install --quiet

RUN npm run build
ENV NODE_ENV=production
ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "start"]