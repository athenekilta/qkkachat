const messages = require("./messages/messages.service.js");
const status = require("./messages/status.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(messages);
  app.configure(status);
};
