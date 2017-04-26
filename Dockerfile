FROM node:6.10

ADD package.json server.js webpack.config.js /jenkins-build-light/
WORKDIR /jenkins-build-light
ADD public public
ADD src src

RUN npm install
EXPOSE 8080

CMD npm start | tee /var/log/build-light.log
