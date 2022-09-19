FROM node:alpine AS Production
# nickname

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .


RUN npm install

COPY . . 
# local files to current directory

ENV PORT=3000

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start"]

