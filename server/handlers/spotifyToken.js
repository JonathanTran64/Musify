const request = require("request");

require("dotenv").config();
const { client_secret } = process.env;
const client_id = "40a54b6f450144acb4b972107fe0e1b9";

let accessToken = null;
let tokenExpiration = 0;

const getAccessToken = async () => {
  return new Promise((resolve, reject) => {
    if (!accessToken || Date.now() >= tokenExpiration) {
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

      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          accessToken = body.access_token;
          tokenExpiration = Date.now() + body.expires_in * 1000;
          resolve(accessToken);
        } else {
          reject(error || body.error || "Internal Server Error");
        }
      });
    } else {
      console.log(accessToken);
      resolve(accessToken);
    }
  });
};
module.exports = { getAccessToken };
