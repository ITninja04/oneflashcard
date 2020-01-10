#! /bin/bash

set -e
cd $(dirname $0)
POSTARGS="--build -V --abort-on-container-exit"

function acceptance {
  cd acceptance/

  DC="docker-compose.yml"
  DC_DEV="dev.docker-compose.yml"

  function test {
    _install_deps
    docker-compose -f $DC up $POSTARGS
  }

  function dev {
    _install_deps
    tmux -f tmux.conf attach
  }

  function _install_deps {
    (cd src && docker run --rm -w /app/ -v $(pwd):/app/ node:13 yarn install)
    (cd ../../core && docker run --rm -w /app/ -v $(pwd):/app/ node:13 yarn install)
  }

  function _dev_main {
    docker-compose -f $DC_DEV up $POSTARGS db core
    docker-compose -f $DC_DEV down
  }

  function _dev_acceptance {
    echo Starting acceptance tests
    sleep 4
    docker-compose -f $DC_DEV run --rm acceptance
    docker-compose -f $DC_DEV down
  }

  $@
}

$@