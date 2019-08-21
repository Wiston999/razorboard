#!/bin/bash

source /etc/puppetlabs/razor-server/razor-torquebox.sh

NAME="razor-server"

JBOSS_PIDFILE="/var/run/${NAME}/torquebox.pid"
export JBOSS_PIDFILE

JBOSS_LOG_DIR="/var/log/${NAME}"
JBOSS_CONSOLE_LOG="${JBOSS_LOG_DIR}/console.log"
JBOSS_SERVER_LOG="${JBOSS_LOG_DIR}/server.log"
export JBOSS_LOG_DIR JBOSS_CONSOLE_LOG JBOSS_SERVER_LOG

JBOSS_USER="razor-server"

JBOSS_CONFIG=standalone.xml
JBOSS_SCRIPT="${JBOSS_HOME}/bin/standalone.sh"

LAUNCH_JBOSS_IN_BACKGROUND=false
export LAUNCH_JBOSS_IN_BACKGROUND

run() {
  echo "==> Running service"
  exec "${JBOSS_SCRIPT}" "-b" "0.0.0.0"
}

start() {
	echo "==> Applying database migrations"
	/opt/puppetlabs/bin/razor-admin -e production migrate-database

	echo "==> Starting service"

  useradd "${JBOSS_USER}"
	# We want to truncate the logfile, not just ensure it exists.
  mkdir -p --mode 0755 $(dirname "${JBOSS_CONSOLE_LOG}")
	echo >"${JBOSS_CONSOLE_LOG}"
	chown "${JBOSS_USER}" "${JBOSS_CONSOLE_LOG}"

	echo >"${JBOSS_SERVER_LOG}"
	chown "${JBOSS_USER}" "${JBOSS_SERVER_LOG}"

	# We can't be sure any directory under /var/run exists after a reboot,
	# since some distributions put it on a ramfs -- and not unreasonably.
	mkdir -p --mode 0755 "$(dirname "${JBOSS_PIDFILE}")"
	echo >"${JBOSS_PIDFILE}"
	chown "${JBOSS_USER}" "${JBOSS_PIDFILE}"

	# Delegate to another instance of the same script, run as another user, to
	# actually fire off the software.  This helps isolate the context between
	# the two, and ensures we don't depend on, eg, environment variables being
	# copied by su -- which is less reliable than one may hope.
	run
}

case "$1" in
  run) run   ;;
  *)   start ;;
esac
