const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b72a4fa7d79be5c0e1d40f238398a9d8&query=' + longitude + ',' + latitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        }

        else if (body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                current_temperature: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
    })
}
module.exports = forecast
