const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { Http2ServerRequest } = require('http2')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

//Dinamically loaded
app.get('', (req, res) => {
    res.render('Index', {
        title: 'Weather page',
        name: 'Aneta Stankovska'
    })
})

//Statically loaded
// app.get('', (req, res) => {
//     res.send(<h1>Hello from home page</h1>
// })

//------------------------------------------------

//Dinamically loaded
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aneta Stankovska'
    })
})

//Statically loaded
// app.get('/about', (req, res) => {
//     res.send('<h1">About page</h1>')
// })

//--------------------------------------------------

//Dinamically loaded
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aneta Stankovska',
        helpText: 'This is a help page. If you don\'t understand the code please call me on +38977555387 :D'
    })
})

//Statically loaded
// app.get('/help', (req, res) => {
//     res.send({
//         firstName: 'Aneta',
//         lastName: 'Stankovska',
//         subjects: ['Node.js', 'Angular']
//     })
// })



app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is extremely hot',
        location: 'Skopje'
    })
})

//Sending JSNO file

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: ['Notebook', 'Pencil', 'Book']
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aneta Stankovska',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aneta Stankovska',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})