# Jenkins Build Light

Visualize the status of all the builds you care about from all your Jenkins instances.

[Jenkins](https://jenkins-ci.org/) is a great tool for CI and general automation. It's so great that several companies are using more than one instance of jenkins to continually integrate their code and deploy services. There's a great [Build Monitor plugin for Jenkins](https://wiki.jenkins-ci.org/display/JENKINS/Build+Monitor+Plugin) that will show you the status of your builds ona single Jenkins instance, but if you're one of those companies with multiple jenkins instances, you need to manually resize browser windows to fit all those lights on one screen. That's where this build light will help you out. It runs as a separate process and uses the Jenkins API to fetch job data from any Jenkins instances that you can access on your network. So go ahead and fullscreen that browser window and let jenkins-build-light help you monitor your builds!

![Screenshot](Screenshot.png)

## Usage

### Light Colors

* Green - last build succeeded
* Red - last build failed
* Grey - one of: last build was aborted, build is disabled, build has never run
* Flashing - build is in progress

### Add Build Lights

Each build that you add will add a light to the grid that polls the jenkins server every 5 seconds for updates.

* Click the plus button in the top right corner.
* In the input box that appears, type the url of the job you want the light to track.
* Either hit Enter or click the plus button again.

### Remove Build Lights

Sometimes a light is no longer interesting, or you messed up the URL when you added it.

* Hover over a build light until an 'x' appears in the top right corner of the light.
* Click the 'x'.

### Save or Share a View

The lights you've added get put up in the URL, so to save the View you've set up, simply bookmark the page and it will load the same lights next time. To share your view, copy and paste the URL.

## Running Your Own Build Light

jenkins-build-light needs network access to your Jenkins servers, so if they're on a private network, you're going to want to deploy jenkins-build-light on your private network.

### With Docker

[![Docker Pulls](https://img.shields.io/docker/pulls/coldpour/jenkins-build-light.svg)](https://hub.docker.com/r/coldpour/jenkins-build-light/)

```bash
docker run -d -P -t coldpour/jenkins-build-light
```

### From Source

```bash
git clone https://github.com/coldpour/jenkins-build-light.git
cd jenkins-build-light
npm install
npm start
```

Then visit [http://localhost:8080](http://localhost:8080).

## Contribute

I'm tracking my work on my waffle board. [![Stories in Ready](https://badge.waffle.io/RallySoftware/jenkins-build-light.png?label=ready&title=Ready)](https://waffle.io/RallySoftware/jenkins-build-light)

Run the app as the "From Source" instructions indicate. After you make changes, press CTRL+C and rerun `npm start`.
