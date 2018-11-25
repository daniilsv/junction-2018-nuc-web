const express = require("express");
const bodyParser = require("body-parser");

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", express.static("public"));

  app.use(function(req, res, next) {
    next(require("http-errors")(404, "Not found"));
  });

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send({
      error: true,
      response: err.message || "Unexpected server error"
    });
  });
};
