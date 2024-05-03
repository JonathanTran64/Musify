"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getKpop,
  getPop,
  getHipHop,
  getCountry,
} = require("./handlers/handlers");

const PORT = 4000;
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/kpop", getKpop)
  .get("/pop", getPop)
  .get("/hip-hop", getHipHop)
  .get("/country", getCountry)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
