const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9bb85f2909af2c3958af747b30364807&query=' + latitude + ',' + longitude + '&units=f'
    request({
        url,
        json: true
    }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            const data = current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degrees out.' + ' It feels like ' + current.feelslike + ' degrees out.'

            callback(undefined, data)
        }
    })
}

module.exports = forecast