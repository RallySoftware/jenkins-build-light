'use strict'

const patchUrl = require('url-patch');
const http = require('http');

const parseJob = (query) => {
  const prefix = '/';
  if(query.startsWith(prefix)) {
    query = query.substring(prefix.length, query.length);
  }
  
  return objectifyJob(query);
};

const parseUrl = (job) => {
  return job.substring(0, job.lastIndexOf('/job/'));
};

const parseName = (job) => {
  return job.substring(job.lastIndexOf('/job/') + 5, job.length);
};

const objectifyJob = (job) => {
  const objectified = {
    url: job,
    patchedUrl: patchUrl(parseUrl(job)),
    name: parseName(job)
  };
  return objectified;
};

const getJob = (job, cb) => {
  const tree = 'tree=color,displayName,url,lastBuild[displayName,number,url,building,estimatedDuration,duration,timestamp,culprits[fullName]]';
  const jobInfo = {
    job: undefined,
    url: job.url
  };
  
  http.get(`${job.patchedUrl}/job/${job.name}/api/json?${tree}`, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      jobInfo.job = JSON.parse(chunk);
    });
    res.on('end', () => {
      cb(null, jobInfo);
    });
  }).on('error', (e) => {
    cb(e, jobInfo);
  });
};

module.exports = (req, res, next) => {
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
