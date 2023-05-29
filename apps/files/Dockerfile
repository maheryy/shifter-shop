FROM node:19-alpine as build

WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM node:19-bullseye-slim as runner

WORKDIR /app

ENV NODE_ENV production
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/google-chrome

# Puppeteer chrome dependency
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist .
COPY --from=build /app/src/assets ./assets
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js" ]