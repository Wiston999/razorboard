#!/bin/sh

set -x

VERSION=$(git describe --tags --long --dirty --always)

MYDIR=$(dirname "${0}")

cat <<EOF > "${MYDIR}/src/environments/version.ts"
export default {
  version: '${VERSION}'
};
EOF

