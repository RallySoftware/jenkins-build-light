'use strict'

const patchUrl = require('url-patch');

module.exports = function(query) {
  const prefix = '/';
  if(query.startsWith(prefix)) {
    query = query.substring(prefix.length, query.length);
  }

  return objectifyJob(query);
};

function objectifyJob(job) {
  const objectified = {
    url: job,
    patchedUrl: patchUrl(parseUrl(job)),
    name: parseName(job)
  };
  return objectified;
};

function parseUrl(job) {
  return job.substring(0, job.lastIndexOf('/job/'));
};

function parseName(job) {
  return job.substring(job.lastIndexOf('/job/') + 5, job.length).replace('/', '');
};
