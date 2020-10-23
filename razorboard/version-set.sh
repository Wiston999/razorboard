#!/bin/sh

VERSION=$(git describe --tags --long --dirty)

cat <<EOF > ./src/environments/version.ts
export default {
  version: '${VERSION}'
};
EOF

