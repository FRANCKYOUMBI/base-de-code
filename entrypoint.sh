#!/bin/sh
set -e
yarn db:push
# yarn db:seed
exec "$@"