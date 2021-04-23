module.exports = {
  '/local/**': {
    target: 'http://localhost:8080',
    pathRewrite: { '/local': '/' },
    secure: false,
    changeOrigin: true
  },
  '/api/**': {
    target: 'http://university.sk.com/',
    secure: false,
    changeOrigin: true
  }
};