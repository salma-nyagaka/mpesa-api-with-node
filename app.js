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

app.get('/access_token', access, (req, res) => {
    // console.log(res.status(200).json(), "body")
    res.status(200).json({
        access_token: req.access_token

    })

})

app.get('/register', access, (req, resp) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"

    let auth = "Bearer " + req.access_token
        // console.log(auth, "authhhh")

    request({
            url: url,
            method: 'POST',
            headers: { "Authorization": auth },
            json: {
                "ShortCode": "600383",
                "ResponseType": "Complete",
                "ConfirmationURL": "http://197.248.86.122:801/confirmation",
                "ValidationURL": "http://197.248.86.122:801/validation_url"
            }


        },
        function(error, response, body) {
            if (error) {
                console.log(error)
            }
            resp.status(200).json(body)
        })
})

app.post('/confirmation', (req, resp) => {
    console.log(req.body, "body")
        // console.log("confirmation...")
})

app.post('/validation', (req, resp) => {
    console.log(req.body, "bodyyy")
        // console.log("validation......")
})


app.get('/simulate', access, (req, resp) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"

    let auth = "Bearer " + req.access_token
    request({
            url: url,
            method: 'POST',
            headers: { "Authorization": auth },
            json: {
                "ShortCode": "600383",
                "CommandID": "CustomerPayBillOnline",
                "Amount": "100",
                "Msisdn": "254708374149",
                "BillRefNumber": "TestAPI"
            },
        },
        function(error, response, body) {
            if (error) {
                console.log(error)
            }
            resp.status(200).json(body)
        })
})

function access(req, res, next) {
    //access token

    consumer_key = "VZ6fThASRSJNPwhmvFFZ4HSRuqGcNLEJ",
        consumer_secret = "8IWVfypsGpIL3KYb",
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
    // console.log(auth, "auth0000")
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
                req.access_token = JSON.parse(body).access_token
                next()
                    // console.log(req.access_token, "token")

            }
        }
    )

}

//listen
app.listen(8000, (err, live) => {
    if (err) {
        console.log(error)
    }
    console.log('Server running on port 8000')
})