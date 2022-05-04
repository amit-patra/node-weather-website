const request = require("request");

const forecast = (latitude, longitude, callback) => {
  let url = `http://api.weatherstack.com/current?access_key=712b36c840abf34b1a8bf0291f7bb64e&query=${
    (longitude, latitude)
  }&units=f`;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Location not found", undefined);
    } else {
      const {temperature, feelslike} = body.current
      callback(
        undefined,
        `It is currently ${temperature} degree out. It feels like  ${feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
