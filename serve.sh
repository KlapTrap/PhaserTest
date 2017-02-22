#!/bin/bash    
node ./node_modules/.bin/webpack --config webpack.config.js &
PIDS[0]=$!    
node ./node_modules/watch-http-server/bin/http-server ./bin &
PIDS[1]=$!

trap "kill ${PIDS[*]}" SIGINT

wait