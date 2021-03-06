// Initializes the `messages` service on path `/messages`
const createService = require("feathers-nedb");
const createModel = require("../../models/status.model");
const hooks = require("./status.hooks");

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model
  };

  // Initialize our service with any options it requires
  app.use("/status", createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service("status");

  service.hooks(hooks);
};
