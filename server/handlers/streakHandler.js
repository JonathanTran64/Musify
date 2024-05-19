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
    const { currentStreak, bestStreak } = user;

    res.status(200).json({
      status: 200,
      currentStreak,
      bestStreak,
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = { getStreaks };
