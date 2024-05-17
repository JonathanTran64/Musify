const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { id } = req.params;
    await client.connect();
    const db = client.db("Data");

    const user = await db.collection("Users").findOne({ _id: id });
    const { favorites } = user;

    res.status(200).json({
      status: 200,
      favorites,
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const patchAddFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { songName, artistName, albumCover, preview, spotifyLink } = req.body;
    const { id } = req.params;

    await client.connect();
    const db = client.db("Data");

    const newFavorite = {
      songName: songName,
      artistName: artistName,
      albumCover: albumCover,
      preview: preview,
      spotifyLink: spotifyLink,
    };

    await db
      .collection("Users")
      .updateOne({ _id: id }, { $push: { favorites: newFavorite } });

    res.status(200).json({
      status: 200,
      message: "Favorite added successfully",
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const patchRemoveFavorite = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { preview } = req.body;
    const { id } = req.params;

    await client.connect();
    const db = client.db("Data");

    await db
      .collection("Users")
      .updateOne({ _id: id }, { $pull: { favorites: { preview: preview } } });

    res.status(200).json({
      status: 200,
      message: "Favorite added successfully",
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = { getFavorites, patchAddFavorite, patchRemoveFavorite };
