FROM mysql/mysql-server:5.6

ARG db_password
ARG db_root_password

ENV MYSQL_ROOT_PASSWORD=$db_root_password
ENV MYSQL_DATABASE=holiday
ENV MYSQL_USER='rico'
ENV MYSQL_PASSWORD=$db_password
ENV MYSQL_HOST='127.0.0.1'
COPY init.sql /data/application/init.sql


