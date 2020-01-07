/*
module.exports = {

  '/api/expert/v1/instructors': {
    //target: 'http://localhost:8119',
    target: 'http://10.178.66.114',
    pathRewrite: { '/api/expert/v1/instructors': '/v1/instructors' },
  },

  '/api/personalCube': {
    target: 'http://10.178.66.114',
    //target: 'http://localhost:8222',
    //pathRewrite: { '/api/personalCube': '/' },
  },

  '/api/lecture': {
    target: 'http://localhost:8555',
    pathRewrite: { '/api/lecture': '/' },
  },

  /!*  '/api/sk/profiles': {
    target: 'http://10.178.66.114',
    pathRewrite: { '/api/sk/profiles': '/profiles' },
  },*!/

  '/api/board': {
    target: 'http://localhost:8193',
    //target: 'http://10.178.66.114',
    pathRewrite: { '/api/board': '/' },
  },

  '/api/college': {
    //target: 'http://localhost:8119',
    target: 'http://10.178.66.114',
    //pathRewrite: { '/api/college': '/api/college' },
  },

  '/api/checkpoint': {
    target: 'http://10.178.66.114',
    //pathRewrite: { '/api/checkpoint': '/checkpoint' },
  },

  '/api/mytraining': {
    target: 'http://10.178.66.114',
    //pathRewrite: { '/api/mytraining': '/mytraining' },
  },

  '/api/profile/profiles': {
    target: 'http://10.178.66.114',
  },

  '/api/depot': {
    target: 'http://10.178.66.114',
    //pathRewrite: { '/api/depot': '/api/depot' },
  },

  '/api/!**': {
    target: 'http://10.178.66.114',
    // target: 'https://mysuni.sk.com',
    secure: false,
    crossOrigin: true,
  },

};
*/

module.exports = {

  // '/api/personalCube': {
  //   target: 'http://10.178.66.114',
  //   // target: 'http://localhost:8223',
  //   // pathRewrite: { '/api/personalCube': '/personalCube' },
  // },

  /*'/api/lecture': {
    target: 'http://localhost:8555',
    pathRewrite: { '/api/lecture': '/' },
  },*/

  '/api/expert/v1/instructors': {
    //target: 'http://localhost:8119',
    target: 'http://10.178.66.114',
    pathRewrite: { '/api/expert/v1/instructors': '/v1/instructors' },
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



