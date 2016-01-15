FROM docker.f4tech.com/jenkins/simple-node

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -

RUN apt-get update
RUN apt-get install -y build-essential nodejs=4.2.4-1nodesource1~trusty1
RUN npm install -f -g npm@2.14.13

ADD package.json server.js webpack.config.js /jenkins-build-light/
WORKDIR /jenkins-build-light
ADD public public
ADD src src

RUN npm install
EXPOSE 8080

CMD npm start --loglevel warn
