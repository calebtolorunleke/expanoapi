const express = require('express')
const app = express()
const port = 3005

const logger = (req, res) => {
    console.log({
        url: req.url,
        method: req.method,
        time: new Date().getFullYear()
    })
}

app.listen(port, () => {
    console.log('app running')
})