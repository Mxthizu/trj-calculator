const path = require("path");

module.exports = {
  mode: "development",
  entry: "./scripts/content.js",
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: false, // Désactiver l'utilisation de eval pour les sourcemaps
};
