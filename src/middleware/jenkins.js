'use strict'

const http = require('http');
const https = require('https');

const parseJob = require('./jobParser');

const getJob = (job, cb) => {
  const tree = 'tree=color,displayName,url,lastBuild[displayName,number,url,building,estimatedDuration,duration,timestamp,culprits[fullName]]';
  const jobInfo = {
    job: undefined,
    url: job.url
  };
  const httpProtocol =
    job.patchedUrl.substring (0,5) != 'https'
      ? http
      : https;

  httpProtocol.get(`${job.patchedUrl}/job/${job.name}/api/json?${tree}`, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      try {
        jobInfo.job = JSON.parse(chunk);
      } catch (SyntaxError) {
        cb(new Error(`failed to parse JSON: ${job}: ${chunk}`), null);
      }
    });
    res.on('end', () => {
      cb(null, jobInfo);
    });
  }).on('error', (e) => {
    cb(e, jobInfo);
  });
};

module.exports = function jenkins(req, res, next) {
  const job = parseJob(req.url);
  getJob(job, (err, results) => {
    if(err) {
      next(err);
    } else {
      res.send(JSON.stringify(results));
      next();
    }
  });
};
