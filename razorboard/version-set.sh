#!/bin/sh

VERSION=$(git describe --tags --long --dirty --always)

cat <<EOF > ./src/environments/version.ts
export default {
  version: '${VERSION}'
};
EOF

