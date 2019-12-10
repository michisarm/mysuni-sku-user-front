module.exports = {
  '/api/sample': {
    target: 'http://localhost:8082',
    pathRewrite: { '/api/sample': '/' },
  },

  '/api/expert': {
    target: 'http://10.178.66.114/lp-front',
    pathRewrite: { '/api/expert': 'v1/instructors' },
  },
};
