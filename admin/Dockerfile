FROM node:19-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install --silent

COPY . .

ENV NODE_ENV production

RUN npm run build



FROM nginx:1.23-alpine as runner

RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/dist /usr/share/nginx/html 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]