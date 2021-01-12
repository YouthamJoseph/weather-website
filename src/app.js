const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //to use a custom dir
hbs.registerPartials(partialsPath)

// routes work with a matching algorithm
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Youtham Joseph'
    })
})

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About me',
            name: 'Youtham Joseph'
        })
})

app.get('/help', (req, res) => {
    res.render('help',
        {
            title: 'Help',
            helpText: 'This is some helpful text.',
            name: 'Youtham Joseph'
        })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error)
            return res.send({
                error: 'Geocode error: ' + error
            })

        forecast(longitude, latitude, (error, { description, current_temperature, feels_like, humidity }) => {
            if (error)
                return res.send({
                    error: 'Forecast error: ' + error
                })

            res.send({
                forecast: description + '. It is currently ' + current_temperature + ' degrees out. It feels like ' + feels_like + ' degrees. The humidity is ' + humidity + '%.',
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })

})

//help 404s
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Error 404: Help article not found.',
        name: 'Youtham Joseph'
    })
})
//generic 404s
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Error 404: Page not found.',
        name: 'Youtham Joseph'
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})
