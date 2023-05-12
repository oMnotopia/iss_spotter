const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((data) => {
    for (const passes of data) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(passes.risetime);
      const duration = passes.duration;
      console.log(`The ISS will fly by at ${datetime} for ${duration} seconds!`);
    }
  }).catch((error) => {
    console.log("It didn't work there was an error: ", error);
  });


