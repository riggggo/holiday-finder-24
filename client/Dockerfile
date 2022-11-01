FROM node:17-alpine
# nickname

WORKDIR /app/client

COPY package.json .
# COPY package-lock.json .


RUN npm install --legacy-peer-deps

COPY . . 
# local files to current directory

EXPOSE 3000

RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]

