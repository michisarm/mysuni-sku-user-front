module.exports = {
  '/api/sample': {
    target: 'http://localhost:8082',
    pathRewrite: { '/api/sample': '/' },
  },

  '/api/expert': {
    target: 'http://localhost:8118',
    pathRewrite: { '/api/expert': 'v1/instructors' },
  },
};
