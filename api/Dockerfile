FROM node:19-bullseye-slim as build

WORKDIR /app

COPY package*.json .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update && apt-get install -y openssl
RUN npm install --silent

COPY . .

ENV NODE_ENV production
ENV APP_ENV production

RUN npx prisma generate
RUN npm run build


FROM node:19-bullseye-slim as runner

WORKDIR /app

# Puppeteer dependencies
RUN apt-get update && apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:prod:migrate" ]