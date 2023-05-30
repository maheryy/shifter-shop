FROM node:19-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install --silent

COPY . .

ARG VITE_API_URL

ENV NODE_ENV production

RUN npm run build



FROM nginx:1.23-alpine as runner

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY config/nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/dist . 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]