"use strict";

const fs = require("fs");
const schedule = require("node-schedule");

const files = fs.readdirSync(__dirname).filter(file => file !== "index.js");

const schedulers = [];
for (const file of files) {
  if (file.toLowerCase().endsWith("js")) {
    const scheduler = require(`./${file}`);
    schedulers.push(scheduler);
  }
}

module.exports = {
  scheduleAll: function () {
    for (const scheduler of schedulers) {
      schedule.scheduleJob(scheduler.pattern, scheduler.func);
    }
  },
};
