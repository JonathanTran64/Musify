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
    console.log(playlists);

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

    console.log(extractedPlaylists);

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
