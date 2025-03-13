require("dotenv").config();
const fetch = require("node-fetch");

// Fetch a playlist with give playlist Id
const getSong = async (req, res, playlist) => {
  try {
    // const accessToken = await getAccessToken();
    const playlistID = playlist[Math.floor(Math.random() * playlist.length)];

    const response = await fetch(
      `https://api.deezer.com/playlist/908622995/tracks`
    );

    const items = await response.json();

    const { data } = items;

    let chosenSong;

    for (let i = 0; i < data.length; i++) {
      const song = data[Math.floor(Math.random() * data.length)];
      chosenSong = song;
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

    console.log(info);

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
  const kpopArrayIds = [
    "37i9dQZF1DX9tPFwDMOaN1",
    "3Ir5YWemOTGRRfXgROrsDV",
    "3RoWb8YSy3vFVOYNaNWtIp",
    "61HtPhUmp6qNVaAq8wcOQs",
    "7DmYmaINse2wok7HB4MxLI",
  ];

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

// getKpop(
//   {},
//   {
//     status: (code) => ({ json: (data) => console.log(code, data) }),
//   }
// );

// POP
const getPop = async (req, res) => {
  const popArrayIds = [
    "37i9dQZF1DWXT8uSSn6PRy",
    "37i9dQZF1DX7LjobXS2hzX",
    "37i9dQZF1DXcOFePJj4Rgb",
    "37i9dQZF1DX2L0iB23Enbq",
    "1WH6WVBwPBz35ZbWsgCpgr",
    "5nYj43JXdyVx0yAtY5OVFP",
  ];

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
  const hiphopArrayIds = [
    "0dMexqq0XIWS3QJ74z3ZhD",
    "5TZkls9cEOzWDR6qCxwDot",
    "37i9dQZF1EQnqst5TRi17F",
    "37i9dQZF1DWT5MrZnPU1zD",
  ];

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
  const countryArrayIds = [
    "4Jb4PDWREzNnbZcOHPcZPy",
    "02t75h5hsNOw4VlC1Qad9Z",
    "3FSvK3GkiECDMHeeIbbJIn",
  ];

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
  const rnbArrayIds = [
    "5zCdhPJHI9kgYsgkSBEWT0",
    "2T3BSpqN34Z4sppHDNWoeE",
    "37i9dQZF1DX2WkIBRaChxW",
  ];

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
  const rockArrayIds = [
    "1ti3v0lLrJ4KhSTuxt4loZ",
    "0ImbTL9gm01nStEsaCmj16",
    "37i9dQZF1EQpj7X7UK8OOF",
  ];

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
          const playlistIdentifier = parts[4].split("?")[0];
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
