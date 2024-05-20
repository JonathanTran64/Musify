const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getStreaks = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { id, genre } = req.params;
    await client.connect();
    const db = client.db("Data");

    const genreLower = genre.toLowerCase();

    const user = await db
      .collection("Users")
      .findOne({ _id: id }, { projection: { [`streaks.${genreLower}`]: 1 } });
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const streakData = user.streaks[genreLower];

    res.status(200).json({
      genreLower,
      currentStreak: streakData[0].currentStreak,
      bestStreak: streakData[1].bestStreak,
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
    const { id, genre } = req.params;
    await client.connect();
    const db = client.db("Data");

    const genreLower = genre.toLowerCase();

    const user = await db
      .collection("Users")
      .findOne({ _id: id }, { projection: { [`streaks.${genreLower}`]: 1 } });

    const streakData = user.streaks[genreLower];
    let newCurrentStreak = streakData[0].currentStreak;
    let bestStreak = streakData[1].bestStreak;

    if (streak === 1) {
      newCurrentStreak += 1;
    } else if (streak === 0) {
      newCurrentStreak = 0;
    }

    if (newCurrentStreak > bestStreak) {
      bestStreak = newCurrentStreak;
    }

    await db.collection("Users").updateOne(
      { _id: id },
      {
        $set: {
          [`streaks.${genreLower}`]: [
            { currentStreak: newCurrentStreak },
            { bestStreak: bestStreak },
          ],
        },
      }
    );

    res.status(200).json({
      status: 200,
      message: "Streaks updated successfully",
      currentStreak: newCurrentStreak,
      bestStreak: bestStreak,
    });
  } catch (error) {
    console.error("Error in updateStreaks:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

const getTop10BestStreakUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const { genre } = req.params;
    const genreLower = genre.toLowerCase();
    await client.connect();
    const db = client.db("Data");

    // Query all users
    const users = await db.collection("Users").find().toArray();

    // Filter users who have the specified genre's streak data
    const filteredUsers = users.filter(
      (user) => user.streaks && user.streaks[genreLower]
    );

    // Sort filtered users based on their best streak for the specified genre in descending order
    filteredUsers.sort(
      (a, b) =>
        b.streaks[genreLower][1].bestStreak -
        a.streaks[genreLower][1].bestStreak
    );

    // Select the top 10 users with the highest best streaks
    const top10Users = filteredUsers.slice(0, 10);

    // Extract their names and best streaks
    const top10UsersData = top10Users.map((user) => ({
      username: user.username,
      bestStreak: user.streaks[genreLower][1].bestStreak,
    }));

    res.status(200).json({
      status: 200,
      top10UsersData,
    });
  } catch (error) {
    console.error("Error in getTop10BestStreakUsers:", error);
    throw error;
  } finally {
    await client.close();
  }
};

module.exports = { getStreaks, updateStreaks, getTop10BestStreakUsers };
