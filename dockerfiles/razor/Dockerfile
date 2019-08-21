FROM debian:stretch

RUN apt -y update && apt -y upgrade
RUN apt -y install curl

RUN curl -o puppet-repo.deb -s https://apt.puppetlabs.com/puppet-release-stretch.deb && \
  dpkg -i puppet-repo.deb && \
  apt -y update && \
  apt-cache search razor && \
  apt -y install razor-server razor-torquebox

RUN apt -y install vim

ADD config.yaml /etc/puppetlabs/razor-server/config.yaml
ADD entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh
CMD ["start"]
