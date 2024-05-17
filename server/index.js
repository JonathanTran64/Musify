"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
  getKpop,
  getPop,
  getHipHop,
  getCountry,
  getRnB,
  getRock,
} = require("./handlers/songHandlers");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("./handlers/authHandler");

const {
  getFavorites,
  patchAddFavorite,
  patchRemoveFavorite,
} = require("./handlers/favoritesHandlers");

const PORT = process.env.PORT || 4000;
express()
  .use(
    cors({
      credentials: true,
      origin: "https://musify-lac.vercel.app",
      // origin: 'https://musify-lac.vercel.app'
    })
  )
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
  .use(cookieParser())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/kpop", getKpop)
  .get("/pop", getPop)
  .get("/hip-hop", getHipHop)
  .get("/country", getCountry)
  .get("/r&b", getRnB)
  .get("/rock", getRock)

  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/profile", getProfile)

  .get("/:id/favorites", getFavorites)
  .patch("/:id/addFavorite", patchAddFavorite)
  .patch("/:id/removeFavorite", patchRemoveFavorite)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
