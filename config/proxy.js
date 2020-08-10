module.exports = {
  '/api/lp/expert': {
    target: 'http://ma.mysuni.sk.com:8118',
    pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  },

  '/lp': {
    target: 'http://ma.mysuni.sk.com',
    secure: false,
    crossOrigin: true,
  },

  '/search/api/**': {
    target: 'http://ma.mysuni.sk.com',
    secure: false,
    crossOrigin: true,
  },

  '/api/**': {
    target: 'http://ma.mysuni.sk.com',
    secure: false,
    crossOrigin: true,
  },

  // '/api/lp/expert': {
  //   target: 'http://localhost:8118',
  //   pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  // },

  // '/lp': {
  //   target: 'http://10.178.66.114',
  //   secure: false,
  //   crossOrigin: true,
  // },

  // '/search/api/**': {
  //   target: 'http://10.178.66.114',
  //   secure: false,
  //   crossOrigin: true,
  // },

  // '/api/**': {
  //   target: 'http://10.178.66.114',
  //   secure: false,
  //   crossOrigin: true,
  // },
};
