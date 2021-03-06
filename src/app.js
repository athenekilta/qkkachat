const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const logger = require("./logger");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");

const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const webpackConfig = require("../webpack.config");

const app = express(feathers());
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
