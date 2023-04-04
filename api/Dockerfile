FROM node:19-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install --silent

COPY . .

ENV NODE_ENV production

RUN npx prisma generate

RUN npm run build


FROM node:19-alpine as runner

WORKDIR /app

RUN npm install pm2 -g
COPY --from=build /app .

EXPOSE 3000

CMD ["pm2", "start", "ecosystem.config.js", "--no-daemon"]