const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()

/* Define paths for Express config */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/* Setup handlebars engine and views location */

// set: set a value for an Express setting
// key - value
app.set('view engine', 'hbs')

// customize views directory
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

/* Setup static directory to serve */

// use html in public directory
app.use(express.static(publicDirectoryPath)) // if use this, function below will not be used
// the above statement is still needed to define project route
// because we need it for css, js and img

/* Setup routes */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yuan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yuan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Yuan'
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Yuan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address :)'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location: 'Seattle',
    //     forecast: 'Cloudy',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You mush provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Yuan'
    })
})

// arg: route, what to do when someone visits url
// app.get('', (req, res) => {
//     // res.send('Hello express!')
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     // res.send('Help Page')
//     res.send([{
//         name: 'Yuan',
//         age: 27
//     }, {
//         name: 'fy',
//         age: 23
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.com
// app.com/help
// app.com/about
// ...

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

