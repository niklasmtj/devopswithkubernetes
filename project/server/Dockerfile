FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN npm install --quiet && npm run build

FROM node:14
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build /app/
COPY package*.json ./
RUN chown -R node:node .
USER node
RUN npm install --quiet --only=prod && npm prune --production
EXPOSE 3001
CMD [ "npm", "start"]