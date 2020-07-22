const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=19d9581b2f04f4664bcc0015dc2b0251&query=${latitude},${longitude}`

    request({url: url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to weather API.', undefined)
        } else if (body.error){
            callback('Unable to find coordinates.', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like it is ${body.current.feelslike} degrees`);
        }
    })
}

module.exports = forecast
