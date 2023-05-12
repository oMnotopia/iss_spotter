const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const passes of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passes.risetime);
    const duration = passes.duration;
    console.log(`The ISS will fly by at ${datetime} for ${duration} seconds!`);
  }
});