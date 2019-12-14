module.exports = {
  '/api/sample': {
    target: 'http://localhost:8082',
    pathRewrite: { '/api/sample': '/' },
  },

  '/api/cube': {
    target: 'http://localhost:8223',
    pathRewrite: { '/api/cube': '/cube' },
  },

  '/api/lp/expert': {
    target: 'http://localhost:8118',
    pathRewrite: { '/api/lp/expert': 'v1/instructors' },
  },

  '/api/college': {
    target: 'http://10.178.66.114',
    pathRewrite: { '/api/college': '/api/college' },
  },

  '/api/sk/profiles': {
    target: 'http://localhost:9020',
    pathRewrite: { '/api/sk/profiles': '/sk/profiles' },
  },

};
