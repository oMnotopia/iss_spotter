const { fetchMyIP, fetchCoordsByIP} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP(`70.36.52.119`, (error, latAndLong) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! Returned Latitude: ${latAndLong.latitude} and logitude: ${latAndLong.longitude}`);
// });