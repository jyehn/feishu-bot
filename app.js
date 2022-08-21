"use strict";

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const mongo = require("koa-mongo");
const config = require("./config");
const router = require("./src/routes/routes");
const { loggerMiddleware } = require("./src/middlewares/logger");
const { errorHandler, responseHandler } = require("./src/middlewares/response");
const { corsHandler } = require("./src/middlewares/cors");
const { scheduleAll } = require("./src/schedulers");
const app = new Koa();

//scheduler jobs
scheduleAll();

// mongo
const { uri } = config.mongoDB;
app.use(
  mongo({
    uri,
  }),
);
// cors
app.use(cors(corsHandler));

// Logger
app.use(loggerMiddleware);

// Error Handler
app.use(errorHandler);

// Global Middlewares
app.use(bodyParser());

// Routes
app.use(router.routes());

// Response
app.use(responseHandler);

module.exports = app;
