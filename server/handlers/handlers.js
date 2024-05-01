const { MongoClient } = require("mongodb");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const request = require("request");
require("dotenv").config();
const { client_secret, MONGO_URI } = process.env;

let accessToken;
let tokenExpirationTime;

const getAccessToken = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const db = client.db("Data");

  const client_id = "40a54b6f450144acb4b972107fe0e1b9";
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, async function (error, response, body) {
    if (!error && response.statusCode === 200) {
      accessToken = body.access_token;
      console.log(accessToken);
      const ob = { _id: uuidv4(), token: accessToken };

      await db.collection("Token").insertOne(ob);
      res.json(body);
    } else {
      res.status(response.statusCode).json({ error: error || body.error });
    }
  });
};

// const refreshTokenIfNeeded = () => {
//   if (!accessToken || Date.now() >= tokenExpirationTime) {
//     getAccessToken();
//   }
// };

const getArtist = async (req, res) => {
  try {
    const artistId = "7F1iAHRYxR3MY7yAEuFqgL";
    // refreshTokenIfNeeded();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    const randomSong =
      data.tracks[Math.floor(Math.random() * data.tracks.length)];

    const songName = randomSong.name;
    const songPreview = randomSong.preview_url;

    res.status(200).json({
      status: 200,
      songName,
      songPreview,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTrack = async (req, res) => {
  try {
    const trackId = "11dFghVXANMlKmJXsNCbNl";
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    res.status(200).json({
      status: 200,
      track: data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAccessToken, getArtist, getTrack };
