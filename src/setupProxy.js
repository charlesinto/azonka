const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      proxy({
        target: 'http://167.99.154.149:1337',
        changeOrigin: true,
      })
    );
      
  };


  //"proxy": "http://167.99.154.149:1337"