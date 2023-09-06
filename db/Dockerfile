FROM mysql/mysql-server:latest

ARG db_password
ARG db_root_password

ENV MYSQL_ROOT_PASSWORD=$db_root_password
ENV MYSQL_DATABASE=holiday
ENV MYSQL_USER='rico@127.0.0.1'
ENV MYSQL_PASSWORD=$db_password

COPY init.sql /data/application/init.sql


