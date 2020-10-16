#!/bin/sh

if [ -z "${RAZOR_API}" ]; then
  export RAZOR_API='http://localhost:8150'
fi

echo "Set razorboard RAZOR_API to '${RAZOR_API}'"

echo "Writing configuration file"
sed -i "s,#REMOTE_API#,${RAZOR_API}," /etc/nginx/conf.d/razorboard.conf
