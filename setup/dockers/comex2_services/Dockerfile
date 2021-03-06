# Comex2 minimal dockerfile
# --------------------------
# based on https://github.com/egeland/docker-gunicorn-python3-flask by F Egeland

FROM ubuntu:xenial

# Base
ENV HOST 0.0.0.0
ENV LANG fr_FR.UTF-8
ENV DEBIAN_FRONTEND noninteractive

RUN locale-gen fr_FR fr_FR.UTF-8
RUN dpkg-reconfigure locales

# Install global dependencies and utilities
RUN echo "updating apt"
RUN apt update && apt autoclean
RUN apt install -y python3-pip libmysqlclient-dev git nano tree iputils-ping nginx-full php7.0-fpm php7.0-mysql ssl-cert

# Configure php fpm to allow environment variables (uncomment removing the ';')
RUN mv /etc/php/7.0/fpm/pool.d/www.conf /etc/php/7.0/fpm/pool.d/www.conf.bak
RUN sed 's/;clear_env = no/clear_env = no/' /etc/php/7.0/fpm/pool.d/www.conf.bak > /etc/php/7.0/fpm/pool.d/www.conf

RUN pip3 install --upgrade pip

# for comex2 itself ----------------------------------------------------------
# add and install the project dependencies
ADD requirements.txt /requirements.txt
RUN pip3 install -r requirements.txt

# copy and symlink the nginx conf
ADD comex2_php_and_services.nginx.conf /etc/nginx/sites-available
WORKDIR /etc/nginx/sites-enabled
RUN rm default
RUN ln -s ../sites-available/comex2_php_and_services.nginx.conf
WORKDIR /

# pull the comex server from repository...
RUN echo "updating"
RUN git clone https://github.com/moma/comex2.git
WORKDIR /comex2

# prepare the production version of tina
WORKDIR static/tinawebJS
RUN bash twtools/adapt_html_paths.sh "static/tinawebJS/"
RUN cp twpresets/settings_explorerjs.comex.js settings_explorerjs.js
WORKDIR ../..

# ...or copy it locally
# ADD comex2 /comex2


# start nginx inner wrapper and gunicorn production server
CMD bash comex-run.sh -p

# ports -----------------------------------------------------------------------

# nginx server (redirecting to php AND services)
EXPOSE 80

# https is actually handled outside by proxy layer
