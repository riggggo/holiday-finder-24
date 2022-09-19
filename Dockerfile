FROM node:alpine AS Production
# nickname

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .


RUN npm install

COPY ./client . 
# local files to current directory

ENV PORT=8080

EXPOSE 8080

RUN npm run build

CMD [ "npm", "start"]

