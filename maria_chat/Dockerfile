ARG MARIADB_VERSION=latest
FROM mariadb:${MARIADB_VERSION}

#####################################
# Set Timezone
#####################################
# Add a database

ENV MYSQL_DATABASE ${MARIADB_DATABASE}

ARG TZ=UTC
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && chown -R mysql:root /var/lib/mysql/
COPY my.cnf /etc/mysql/conf.d/my.cnf

CMD ["mysqld"]

EXPOSE 3306
