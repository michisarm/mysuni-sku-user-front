module.exports = {
  '/api/sample': {
    target: 'http://localhost:8082',
    pathRewrite: { '/api/sample': '/' },
  },

  '/lp-front': {
    target: 'http://10.178.66.114/',
    pathRewrite: { '/lp-front': 'v1/instructors' },
  },
};
