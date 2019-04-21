const path = require('path');
require("babel-polyfill");

module.exports = {
  mode: 'development',
/*  entry: ['babel-polyfill', "/home/ainohai/puutarha/sivu/wp-content/themes/haikalanpuoti/assets/js/react/hello.js"],
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'reactStuff.js'
  },*/
  entry: {
      reactProductCat: "./reactProductCat",
      adminProductList: "./adminProductList"
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
        }
      },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }
    ]
  }
};

