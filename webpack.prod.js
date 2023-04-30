const path = require('path');


module.exports = {
  entry: 
   { main: './app.js'},

  output: {
    path: path.resolve(__dirname, 'Prod-build'),
    publicPath:'/', 
    filename: 'main.js',
    clean: true

  },
  target : 'node'
 
};