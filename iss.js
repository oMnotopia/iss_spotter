/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  const URL = `https://api.ipify.org/?format=json`;
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

const fetchCoordsByIP = (ip, callback) => {
  if (!ip) return callback(Error("No IP provided"));

  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error.message);

    if (body) {
      const JSONBody = JSON.parse(body);
      if (JSONBody.success === false) return callback(JSONBody.message);
      const latLongObject = {latitude: JSONBody.latitude, longitude: JSONBody.longitude};
      
      return callback(null, latLongObject);
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, body) => {
    if (error) return callback(error.message);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg));
    }

    if (body) {
      return callback(null, JSON.parse(body).response);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    fetchCoordsByIP(ip, (error, latAndLong) => {

      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      fetchISSFlyOverTimes(latAndLong,(error,flyOverTImes) => {
        if (error) {
          console.log("It didn't work",  error);
          return;
        }
        callback(null, flyOverTImes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };