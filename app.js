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
    console.log("confirmation........")

    // console.log("confirmation...")
})

app.post('/validation', (req, resp) => {
    console.log("validation........")
        // console.log("validation......")
})


app.get('/simulate', access, (req, resp) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"

    let auth = "Bearer " + req.access_token
        // console.log(req, "authhhh")


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

//balance
app.get('/balance', access, (req, resp) => {
    let endpoint = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"

    let auth = "Bearer " + req.access_token
        // console.log(req, "authhhh")


    request({
            url: endpoint,
            method: 'POST',
            headers: { "Authorization": auth },
            json: {
                "Initiator": "apitest342",
                "SecurityCredential": "OEnTXfEBwUauXnrDkVKdHP4QUJm8Q7stMX/lqsOhHC2sn+9NL7/vNaS0PBlGpbBEkmGc5XAhN+K0FLiHjYKhjOCGRKlFzuSRqyPvToSfysQUNge/rP3dinYe3IS3y7VpFWyOwSTbc0+hM+aeFB3RNM3pzMZGaYT5n5nsBNC6HsGuzryIWzoJDX2K8Qtb/xkCWfCfON0VPl6Zs+sq2nATRELK1vj6DwZ2wemDmQ2v1967MtFwu6F9spYS4IRoDo/XyYUWq+N74N7ZhvTHOhMxFww5JETfn/BPo1FuXPRXlGImi45FzFKYct7cpE2bjf9y1lPrmnv33FIf9JXoC4SAZQ==",
                "CommandID": "AccountBalance",
                "PartyA": "600744",
                "IdentifierType": "4",
                "Remarks": "Remarks",
                "QueueTimeOutURL": "http://197.248.86.122:801/timeout_url",
                "ResultURL": "http://197.248.86.122:801/result_url"
            },
        },
        function(error, response, body) {
            if (error) {
                console.log(error)
            }
            resp.status(200).json(body)
        })
})

app.post('/timeout_url', (req, resp) => {
    console.log("balance time out report.......")
    console.log(req.body, " req body timeout balance report.......")


    // console.log("confirmation...")
})

app.post('/result_url', (req, resp) => {
    console.log("balance report.......")
    console.log(req.body, " req body balance report.......")

    // console.log("validation......")
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