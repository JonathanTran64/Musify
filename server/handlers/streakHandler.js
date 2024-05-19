const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getStreaks = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { id } = req.params;
    await client.connect();
    const db = client.db("Data");

    const user = await db.collection("Users").findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const { currentStreak, bestStreak } = user;

    res.status(200).json({
      status: 200,
      currentStreak,
      bestStreak,
    });
  } catch (error) {
    console.error("Error in getStreaks:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

const updateStreaks = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { streak } = req.body;
    const { id } = req.params;
    await client.connect();
    const db = client.db("Data");

    const user = await db.collection("Users").findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const { bestStreak } = user;

    let newStreak;
    if (streak === 1) {
      newStreak = user.currentStreak + 1;
    } else if (streak === 0) {
      newStreak = 0;
    }

    if (newStreak >= bestStreak) {
      await db
        .collection("Users")
        .updateOne({ _id: id }, { $set: { bestStreak: newStreak } });
    }

    await db
      .collection("Users")
      .updateOne({ _id: id }, { $set: { currentStreak: newStreak } });

    res.status(200).json({
      status: 200,
      message: "Current streak updated successfully",
      currentStreak: newStreak,
    });
  } catch (error) {
    console.error("Error in updateCurrentStreak:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

module.exports = { getStreaks, updateStreaks };
