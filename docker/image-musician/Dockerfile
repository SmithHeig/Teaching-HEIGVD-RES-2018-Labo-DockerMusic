FROM node:9-alpine

ADD /musicien/ /opt/musicien/

WORKDIR /opt/musicien/musicien/

RUN ["npm","install"]

ENTRYPOINT ["node","musicien.js"]
