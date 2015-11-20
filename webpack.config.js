module.exports = {
  entry: "./index.js",
  output:{
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      //{ test: /\.jsx?$/, loader: 'babel', query: {presets: ['es2015',  'stage-0', 'react']}, exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel', stage: 0, exclude: /node_modules/ },
      { test: /\.css$/, loader: "style!css" },
    ]
  }
}
