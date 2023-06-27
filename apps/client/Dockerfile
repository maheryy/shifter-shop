FROM node:19-alpine as build

WORKDIR /app

# Copy node packages and build config
COPY package*.json .
COPY tsconfig.base.json .
COPY nx.json .

# Copy target app and its libs dependencies
COPY apps/client ./apps/client
COPY libs/ ./libs
RUN npm install

# Build the app
ARG VITE_API_URL
ENV NODE_ENV production
ENV VITE_API_URL ${VITE_API_URL}
RUN npx nx build client


FROM nginx:1.23-alpine as runner

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY apps/client/config/nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/apps/client/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]