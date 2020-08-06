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

};

