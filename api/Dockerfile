FROM node:17-alpine


WORKDIR /app/api


COPY package.json .

RUN npm install

COPY . . 

EXPOSE 8000


CMD ["node", "app.js"]

