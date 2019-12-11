module.exports = {
  '/api/sample': {
    target: 'http://localhost:8082',
    pathRewrite: { '/api/sample': '/' },
  },

  '/api/lp/expert': {
    target: 'http://10.178.66.114/',
    pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  },
};
