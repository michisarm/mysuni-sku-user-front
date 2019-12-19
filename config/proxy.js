module.exports = {

  // '/api/personalCube': {
  //   target: 'http://10.178.66.114',
  //   // target: 'http://localhost:8223',
  //   // pathRewrite: { '/api/personalCube': '/personalCube' },
  // },


  '/api/lp/expert': {
    target: 'http://localhost:8118',
    pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  },

  '/api/profile/profiles': {
    target: 'http://localhost:9021/',
  },

  // // personalCube, college
  '/api/**': {
    target: 'http://10.178.66.114',
  },
};
