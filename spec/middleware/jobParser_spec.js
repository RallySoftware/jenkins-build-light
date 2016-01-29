const j = require('../../src/middleware/jobParser');

describe('JobParser', () => {
  it('parses even if no job', () => {
    expect(j('foo')).toEqual({
      url: 'foo',
      patchedUrl: 'http://',
      name: ''
    });
  });
  it('parses real jobs', () => {
    expect(j('jenkins/job/jenkins-jobs/job/moo')).toEqual({
      url: 'jenkins/job/jenkins-jobs/job/moo',
      patchedUrl: 'http://jenkins/job/jenkins-jobs',
      name: 'moo'
    });
  });
  it('parses jobs with http in the url', () => {
    expect(j('http://jenkins.ci/view/allthejobs/job/onejob/')).toEqual({
      url: 'http://jenkins.ci/view/allthejobs/job/onejob/',
      patchedUrl: 'http://jenkins.ci/view/allthejobs',
      name: 'onejob'
    });
  });
});
