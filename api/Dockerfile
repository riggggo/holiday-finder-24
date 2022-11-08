FROM node:17-alpine
# nickname

WORKDIR /app/api


# arg secified during the build process (--build-arg db_password=)
# arg passed to env
ARG db_password
ENV db_password =$db_password
COPY package.json .

RUN npm install

COPY . . 
# local files to current directory

EXPOSE 8000


CMD ["node", "app.js"]

