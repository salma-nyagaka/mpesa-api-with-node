const express = require('express')
const app = express()
const request = require('request')

//routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/home', (req, res) => {
    res.send('Hello World')
})

app.get('/access_token', (req, res) => {
    //access token
    val = "124"

    consumer_key = "qJEEgPZR0AZYoTukaxAuX5tkEAWXZF5S",
        consumer_secret = "4TauT5pKMPRik8n7",
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");
    //takes two parameters one that we are sending to mpesa
    request({
            url: url,
            headers: {
                "Authorization": auth
            }
        },
        (error, response, body) => {
            if (error) {
                console.log(error, "error")
            } else {
                res.status(200).json(body)
                console.log(error, "passed")

            }
        }
    )
})

//listen
app.listen(8000, (err, live) => {
    if (err) {
        console.log(error)
    }
    console.log('Server running on port 8000')
})