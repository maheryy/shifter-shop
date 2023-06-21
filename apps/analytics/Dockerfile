FROM node:19-alpine as build

WORKDIR /app

# Copy node packages and build config
COPY package*.json .
COPY tsconfig.base.json .
COPY nx.json .

# Copy target app and its libs dependencies
COPY apps/analytics ./apps/analytics

# Install packages and build the app
RUN npm install
RUN npx nx build analytics-svc

FROM node:19-alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/apps/analytics/dist .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]