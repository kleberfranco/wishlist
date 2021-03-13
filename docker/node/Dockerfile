FROM keymetrics/pm2:10-alpine

ENV NPM_CONFIG_LOGLEVEL error

ADD api /api
WORKDIR /api

RUN npm install -g

CMD [ "pm2-runtime", "start", "pm2.json" ]

