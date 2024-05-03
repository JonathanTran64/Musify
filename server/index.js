"use strict";

const express = require("express");
const morgan = require("morgan");
const { getKpop, getAllKpop } = require("./handlers/handlers");

const { getAccessToken } = require("./handlers/spotifyToken");

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

  .get("/accessToken", getAccessToken)
  .get("/KPOP", getKpop)
  .get("/KPOPAll", getAllKpop)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
