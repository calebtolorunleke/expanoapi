const express = require('express')
const app = express()
const port = 3002
const movies = require('./db/movies.js')

// console.log(movies)

//app.get
// app.set
// app.delete
// app.listen
// express does the setting of header automatically


//middleware comes between request and response meaning of our request comes within or through the middleware
//are always inside app.use 
const logger = (req, res, next) => {
    console.log({
        url: req.url,
        method: req.method,
        time: new Date().getFullYear()
    })
    next()
}

//middleware in express don't need the next keyword
// middleware below return middleware that passes json as data
app.use(logger)
app.use(express.json())




const auth = (req, res, next) => {
    console.log('authorized to visit the api')
    next()
}




// to make sure our server is able to access user data in form of json object - app.use.express.json 

//middleware come within request and response 
// app.get('/', logger, (req, res) => {
//     res.send('home page')
// })


app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/about', auth, (req, res) => {
    res.send('about page')
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/api/movies', auth, (req, res) => {
    res.status(200).json({ numofmovies: movies.length, movies })
})

app.get('/api/movies/:movieId', auth, (req, res) => {
    //req.params
    // console.log(req.params)
    const { movieId } = req.params
    // console.log(movieId)
    const movie = movies.find((movie) =>
        movie.id === parseInt(movieId)
    )
    if (!movie) {
        return res.status(404).json({ msg: `movie with the id ${movieId} not found` })
    }
    res.status(200).json({ movie })
})

app.all(/.*/, (req, res) => {
    res.status(404).send('error page');
});



app.listen(port, () => {
    console.log('app is running on port 3002...')
})