const NeDB = require("nedb");
const path = require("path");

module.exports = function(app) {
  const Model = new NeDB({
    filename: path.join("./data/status.db"),
    autoload: true
  });

  return Model;
};
