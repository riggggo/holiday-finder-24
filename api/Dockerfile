FROM node:17-alpine
# nickname

WORKDIR /app/api


COPY package.json .

RUN npm install

COPY . . 
# local files to current directory

EXPOSE 8000


CMD ["node", "app.js"]

