const request = require("request-promise-native");

const fetchMyIp = () => {
  return request(`https://api.ipify.org/?format=json`);
};

const fetchCoordsByIP = (JSONIP) => {
  const IP = JSON.parse(JSONIP).ip;
  return request(`http://ipwho.is/${IP}`);
};

const fetchISSFlyOverTimes = (JSONCoords) => {
  const {latitude, longitude} = JSON.parse(JSONCoords);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };