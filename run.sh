#!/bin/sh
git pull
npm install --no-progress
node_modules/@angular/cli/bin/ng build --prod --aot --no-progress
pm2 startOrRestart ecosystem.config.js --update-env
pm2 save