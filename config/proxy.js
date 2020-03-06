module.exports = {

  '/api/lp/expert': {
    target: 'http://localhost:8118',
    pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  },

  '/lp': {
    target: 'http://10.178.66.114',
    secure: false,
    crossOrigin: true,
  },

  '/search/api/**': {
    target: 'http://10.178.66.114',
    secure: false,
    crossOrigin: true,
  },

  '/api/**': {
    target: 'http://10.178.66.114',
    secure: false,
    crossOrigin: true,
  },
};

