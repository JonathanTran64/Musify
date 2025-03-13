require("dotenv").config();
const fetch = require("node-fetch");

// Fetch a playlist with give playlist Id
const getSong = async (req, res, playlist) => {
  try {
    const playlistID = playlist[Math.floor(Math.random() * playlist.length)];

    const response = await fetch(
      `https://api.deezer.com/playlist/${playlistID}/tracks`
    );

    const items = await response.json();

    const { data } = items;

    let chosenSong;

    while (!chosenSong) {
      const song = data[Math.floor(Math.random() * data.length)];
      if (song.preview) {
        chosenSong = song;
      }
    }

    const artistName = chosenSong.artist.name;
    const songName = chosenSong.title_short;
    const preview = chosenSong.preview;
    const albumCover = chosenSong.album.cover_medium;
    const spotifyLink = chosenSong.link;

    const info = {
      artistName: artistName,
      songName: songName,
      preview: preview,
      albumCover: albumCover,
      spotifyLink: spotifyLink,
    };

    // Get all songs in a artist - song format
    let songsArray = [];
    for (const object of data) {
      const artistName = object.artist.name;
      const songName = object.title_short;
      songsArray.push(`${artistName} - ${songName}`);
    }

    return { song: info, songsArray };
  } catch (error) {
    console.log(error);
  }
};

// KPOP
const getKpop = async (req, res) => {
  const kpopArrayIds = ["4096400722", "12087463111"];

  try {
    const { song, songsArray } = await getSong(req, res, kpopArrayIds);

    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// POP
const getPop = async (req, res) => {
  const popArrayIds = ["1282495565", "1386209585", "4403076402"];

  try {
    const { song, songsArray } = await getSong(req, res, popArrayIds);
    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// HIP-HOP
const getHipHop = async (req, res) => {
  const hiphopArrayIds = ["1862349026"];

  try {
    const { song, songsArray } = await getSong(req, res, hiphopArrayIds);
    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// COUNTRY
const getCountry = async (req, res) => {
  const countryArrayIds = ["1130102843", "1132251583"];

  try {
    const { song, songsArray } = await getSong(req, res, countryArrayIds);
    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// R&B
const getRnB = async (req, res) => {
  const rnbArrayIds = ["7024537744"];

  try {
    const { song, songsArray } = await getSong(req, res, rnbArrayIds);
    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

// ROCK
const getRock = async (req, res) => {
  const rockArrayIds = ["9076630322", "1578812305"];

  try {
    const { song, songsArray } = await getSong(req, res, rockArrayIds);
    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

const postCustom = async (req, res) => {
  console.log(req.body);

  try {
    const { playlists } = req.body;

    const extractedPlaylists = [];

    for (const key in playlists) {
      if (Object.hasOwnProperty.call(playlists, key)) {
        const playlistLink = playlists[key];

        // Check if the playlist link is empty
        if (playlistLink.trim() !== "") {
          const parts = playlistLink.split("/");
          const playlistIdentifier = parts[3].split("?")[0];
          extractedPlaylists.push(playlistIdentifier);
        }
      }
    }

    const { song, songsArray } = await getSong(req, res, extractedPlaylists);
    if (song) {
      res.status(200).json({
        status: 200,
        song,
        songsArray,
        message: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getKpop,
  getPop,
  getHipHop,
  getCountry,
  getRnB,
  getRock,
  postCustom,
};
