FROM node:19-alpine as build

WORKDIR /app

COPY package*.json .
RUN npm install --silent
COPY . .
RUN npm run build


FROM node:19-alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js" ]