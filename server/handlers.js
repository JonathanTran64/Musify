const request = require("request");
const fetch = require("node-fetch");

const getToken = async (req, res) => {
  const client_id = "40a54b6f450144acb4b972107fe0e1b9";
  const client_secret = "dd2da9686ea44f1c992180854fe286ad";

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

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      res.status(response.statusCode).json({ error: error || body.error });
    }
  });
};

const getArtist = async (req, res) => {
  try {
    const artistId = "7F1iAHRYxR3MY7yAEuFqgL";
    const accessToken =
      "BQBdMI8QtF45_qiPWrySn5StSBaqrFHTxgxAt2ItnaX2G1javgU-8esmUy6vV5TtJvazQI3q1_39rif9BrbE8DPI_Y2lT7ddhxua8i4jgV69M3gCKxM";

    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    const randomSong =
      data.tracks[Math.floor(Math.random() * data.tracks.length)];

    const songName = randomSong.name;
    const songPreview = randomSong.preview_url;

    res.status(200).json({
      status: 200,
      songName,
      songPreview,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTrack = async (req, res) => {
  try {
    const trackId = "11dFghVXANMlKmJXsNCbNl";
    const accessToken =
      "BQBdMI8QtF45_qiPWrySn5StSBaqrFHTxgxAt2ItnaX2G1javgU-8esmUy6vV5TtJvazQI3q1_39rif9BrbE8DPI_Y2lT7ddhxua8i4jgV69M3gCKxM";

    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

    res.status(200).json({
      status: 200,
      track: data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getToken, getArtist, getTrack };
