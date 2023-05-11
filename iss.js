/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const URL = `https://api.ipify.org/?format=json`;

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request(URL, (error, response, body) => {
    if (error) return callback(error.message);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg));
    }

    if (body) {
      return callback(null, JSON.parse(body).ip);
    }
  });
};

module.exports = { fetchMyIP };