module.exports = {

  '/api/personalCube': {
    // target: 'http://10.178.66.114',
    target: 'http://localhost:8222',
    pathRewrite: { '/api/personalCube': '/' },
  },

  '/api/lp/expert': {
    target: 'http://localhost:8118',
    pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  },

  '/api/sk/profiles': {
    target: 'http://localhost:9020',
    pathRewrite: { '/api/sk/profiles': '/sk/profiles' },
  },

  '/api/board': {
    target: 'http://localhost:8193',
    pathRewrite: { '/api/board': '/board' },
  },

  '/api/profile/profiles': {
    target: 'http://localhost:9021/',
  },
  // '/api/profile/profiles': {
  //   target: 'http://localhost:9021/',
  // },

  // // personalCube, college
  '/api/**': {
    target: 'http://10.178.66.114',
    // target: 'https://mysuni.sk.com',
    secure: false,
    crossOrigin: true,
  },
};

