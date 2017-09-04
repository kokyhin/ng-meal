#!/bin/sh
git pull
npm install
ng build --prod --aot
pm2 startOrRestart ecosystem.config.js --update-env
pm2 save
