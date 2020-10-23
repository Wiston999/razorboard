#!/bin/sh

ME="${0}"

eco () {
  echo "${ME} ==> ${1}"
}

if [ -z "${RAZOR_API}" ]; then
  export RAZOR_API='http://localhost:8150'
fi

if [ -z "${SSL_ENABLED}" ]; then
  export SSL_ENABLED='0'
fi

if [ "${SSL_ENABLED}" == 'true' ]; then
  eco "Using HTTPS version"
  mv /etc/nginx/conf.d/razorboard-https.conf.available /etc/nginx/conf.d/razorboard.conf

  if [ ! -f "${SSL_CERT}" -o ! -f "${SSL_KEY}" ]; then
    eco "ERROR: SSL_CERT and SSL_KEY must be defined to existing files"
    exit 1
  fi

  sed -i "s,#SSL_CERT#,${SSL_CERT}," /etc/nginx/conf.d/razorboard.conf
  sed -i "s,#SSL_KEY#,${SSL_KEY}," /etc/nginx/conf.d/razorboard.conf
else
  eco "Using plain HTTP version"
  mv /etc/nginx/conf.d/razorboard-http.conf.available /etc/nginx/conf.d/razorboard.conf
fi

eco "Set razorboard RAZOR_API to '${RAZOR_API}'"
sed -i "s,#REMOTE_API#,${RAZOR_API}," /etc/nginx/conf.d/razorboard.conf
