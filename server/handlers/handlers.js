const fetch = require("node-fetch");
const { getAccessToken } = require("../handlers/spotifyToken");

const getKpop = async (req, res) => {
  const kpopArrayIds = [
    "3Ir5YWemOTGRRfXgROrsDV",
    "0jB4ANR4ox65etDMnxvGLp",
    "2EoheVFjqIxgJMb8VnDRtZ",
    "37i9dQZF1DX9tPFwDMOaN1",
    "6tQDMnj0qImEl6AKA1Uv74",
  ];

  try {
    const accessToken = await getAccessToken();
    const playlistID =
      kpopArrayIds[Math.floor(Math.random() * kpopArrayIds.length)];

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

    const song1 = items[Math.floor(Math.random() * items.length)];
    const song2 = items[Math.floor(Math.random() * items.length)];
    const song3 = items[Math.floor(Math.random() * items.length)];

    let chosenSong;
    if (song1.track.preview_url !== null) {
      chosenSong = song1;
    } else if (song2.track.preview_url !== null) {
      chosenSong = song2;
    } else if (song3.track.preview_url !== null) {
      chosenSong = song3;
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

    res.status(200).json({
      status: 200,
      song: info,
      songsArray,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getKpop };
