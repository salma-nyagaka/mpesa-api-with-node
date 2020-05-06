const express = require('express')
const app = express();

//routes
app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.get('/home', (req, res) =>{
    res.send('Hello World')
})
//
app.listen(8000);