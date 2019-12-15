module.exports = {

  '/api/college': {
    target: 'http://10.178.66.114',
  },

  '/api/personalCube': {
    target: 'http://10.178.66.114',
    // target: 'http://localhost:8223',
    // pathRewrite: { '/api/personalCube': '/personalCube' },
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
    target: 'http://localhost:8193/',
    pathRewrite: { '/api/board': '/board' },
  },

};
