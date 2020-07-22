const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                } else {
                    return res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000.');
})