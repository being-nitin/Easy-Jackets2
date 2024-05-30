const nodeExternals = require("webpack-node-externals");

module.exports = {
  // Other webpack configurations...

  // Add this section to exclude node_modules from bundling
  externals: [nodeExternals()],
};
