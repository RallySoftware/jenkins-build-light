(() => {
  var express = require('express');
  var middleware = './src/middleware';

  var app = express();

  // app.use(require(`${middleware}/logger`)); // turn on for development
  app.use('/q', require(`${middleware}/jenkins`));
  app.use(express.static(__dirname + '/public'));

  var port = 8080;
  app.listen(port, () => {
    console.log('Server listening on port', port);
  });
})();
