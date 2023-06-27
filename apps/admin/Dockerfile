FROM node:19-alpine as build

WORKDIR /app

# Copy node packages and build config
COPY package*.json .
COPY tsconfig.base.json .
COPY nx.json .

# Copy target app and its libs dependencies
COPY apps/admin ./apps/admin
COPY libs/ ./libs
RUN npm install

# Build the app
ENV NODE_ENV production
RUN npx nx build admin


FROM nginx:1.23-alpine as runner

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY apps/admin/config/nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/apps/admin/dist . 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]