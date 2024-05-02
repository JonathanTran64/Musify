const { MongoClient } = require("mongodb");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const request = require("request");
require("dotenv").config();
const { client_secret, MONGO_URI } = process.env;

console.log(MONGO_URI);

const getAccessToken = async (req, res) => {
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
      res.json(body);
    } else {
      res.status(response.statusCode).json({ error: error || body.error });
    }
  });
};

const getPlaylist = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("Categories");

    const playlistID = "";
    const accessToken =
      "BQAQa8SFKJXPJBybDha90uVzGXVbgflHRGWhlH7G0jtlsRbcZ-XWQmpofRo9iQXOy6B_3sxSTSSHCanH6jOwmbyVnw5mfA0nsSmPFs2zl7sF1p8CLb8";

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    const { items } = data;

    let count = 97;

    for (const obj of items) {
      const artistName = obj.track.artists[0].name;
      const songName = obj.track.name;
      const preview = obj.track.preview_url;
      const albumCover = obj.track.album.images[2].url;
      const spotifyLink = obj.track.external_urls.spotify;

      if (preview === null) {
        continue;
      }

      const info = {
        _id: count + 1,
        artistName: artistName,
        songName: songName,
        preview: preview,
        albumCover: albumCover,
        spotifyLink: spotifyLink,
      };

      await db.collection("Kpop").insertOne(info);
      count++;
    }

    res.status(200).json({
      status: 200,
      items,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const getKpop = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Categories");

    const song = await db
      .collection("Kpop")
      .findOne({ _id: Math.floor(Math.random() * 150) });

    if (song) {
      res.status(200).json({
        status: 200,
        song,
      });
    } else {
      res.status(404).json();
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const getAllKpop = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("Categories");

    const song = await db.collection("Kpop").find().toArray();

    const songArray = song.map((obj) => {
      return `${obj.artistName} - ${obj.songName}`;
    });

    if (song) {
      res.status(200).json({
        status: 200,
        songArray,
      });
    } else {
      res.status(404).json();
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = { getAccessToken, getPlaylist, getKpop, getAllKpop };
