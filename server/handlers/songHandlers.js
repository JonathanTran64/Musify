const fetch = require("node-fetch");
const { getAccessToken } = require("../handlers/spotifyToken");

// Fetch a playlist with give playlist Id
const getSong = async (req, res, playlist) => {
  try {
    const accessToken = await getAccessToken();
    const playlistID = playlist[Math.floor(Math.random() * playlist.length)];

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

    let chosenSong;
    for (let i = 0; i < items.length; i++) {
      const song = items[Math.floor(Math.random() * items.length)];
      if (song.track.preview_url !== null) {
        chosenSong = song;
      }
    }

    const artistName = chosenSong.track.artists[0].name;
    const songName = chosenSong.track.name;
    const preview = chosenSong.track.preview_url;
    const albumCover = chosenSong.track.album.images[2].url;
    const spotifyLink = chosenSong.track.external_urls.spotify;

    const info = {
      artistName: artistName,
      songName: songName,
      preview: preview,
      albumCover: albumCover,
      spotifyLink: spotifyLink,
    };

    // Get all songs in a artist - song format
    let songsArray = [];
    for (const object of items) {
      const artistName = object.track.artists[0].name;
      const songName = object.track.name;
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
    "3Ir5YWemOTGRRfXgROrsDV",
    "0jB4ANR4ox65etDMnxvGLp",
    "2EoheVFjqIxgJMb8VnDRtZ",
    "37i9dQZF1DX9tPFwDMOaN1",
    "6tQDMnj0qImEl6AKA1Uv74",
    "4JcbaaznRdlWyzkXrDC7C6",
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

// POP
const getPop = async (req, res) => {
  const popArrayIds = [
    "6mtYuOxzl58vSGnEDtZ9uB",
    "1WH6WVBwPBz35ZbWsgCpgr",
    "37i9dQZF1DWXT8uSSn6PRy",
    "1Cgey68pUlQGsCPI2wJuxr",
    "2xutOn4Ea4RyjuaRaD3jl3",
    "2eVuLoCP74cegyax11zgEf",
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
  const popArrayIds = [
    "0dMexqq0XIWS3QJ74z3ZhD",
    "5TZkls9cEOzWDR6qCxwDot",
    "37i9dQZF1EQnqst5TRi17F",
    "37i9dQZF1DWT5MrZnPU1zD",
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

// COUNTRY
const getCountry = async (req, res) => {
  const popArrayIds = [
    "4Jb4PDWREzNnbZcOHPcZPy",
    "02t75h5hsNOw4VlC1Qad9Z",
    "3FSvK3GkiECDMHeeIbbJIn",
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

// R&B
const getRnB = async (req, res) => {
  const popArrayIds = [
    "5zCdhPJHI9kgYsgkSBEWT0",
    "2T3BSpqN34Z4sppHDNWoeE",
    "37i9dQZF1DX2WkIBRaChxW",
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

// ROCK
const getRock = async (req, res) => {
  const popArrayIds = [
    "1ti3v0lLrJ4KhSTuxt4loZ",
    "0ImbTL9gm01nStEsaCmj16",
    "37i9dQZF1EQpj7X7UK8OOF",
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

module.exports = { getKpop, getPop, getHipHop, getCountry, getRnB, getRock };
