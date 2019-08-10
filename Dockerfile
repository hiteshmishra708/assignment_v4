FROM node:10-alpine

WORKDIR /opt/app

ENV PORT=80

# Globally installed NPMs:
RUN npm install -g pm2

RUN echo 'set -e' > /boot.sh
RUN echo 'crond' >> /boot.sh

# install packages
RUN echo 'npm install --production' >> /boot.sh

# logs by default are in logs
RUN mkdir -p logs

# npm start, make sure to have a start attribute in "scripts" in package.json
CMD sh /boot.sh && pm2-runtime --max-memory-restart=200M --output logs/out.log --error logs/error.log start npm -- start