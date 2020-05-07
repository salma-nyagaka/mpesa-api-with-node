const express = require('express')
const app = express()
const request = require('request')
const moment = require("moment")


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

//lipa na mpesa stk - lmno


app.get('/stk', access, (req, res) => {
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        auth = "Bearer " + req.access_token
        // let date = new Date()
        // const timestamp = date.getFullYear() + "" + "" + date.getMonth() + "" + "" + date.getDate() + "" + "" + date.getHours() + "" + "" + date.getMinutes() + "" + "" + date.getSeconds()
    let timestamp = moment().format('YYYYMMDDHHmmss')

    const password = new Buffer.from('174379' + 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + timestamp).toString('base64')

    request({
            url: url,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "BusinessShortCode": "174379",
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": "1",
                "PartyA": "254716437799",
                "PartyB": "174379",
                "PhoneNumber": "254716437799",
                "CallBackURL": "http://197.248.86.122:801/stk_callback",
                "AccountReference": "Test",
                "TransactionDesc": "TestPay"
            }
        },
        function(error, response, body) {
            if (error) {
                console.log(error)
            } else {
                res.status(200).json(body)
            }
        }
    )
})

app.post('/stk_callback', (req, resp) => {
    // console.log("stk......")
    console.log(req.body.Body.CallbackMetadata, " stk.......")


    // console.log("confirmation...")
})

app.get('/b2c', access, (req, res) => {
    const url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
        auth = 'Bearer ' + req.access_token

    request({
            method: "POST",
            url: url,
            headers: {
                "Authorization": auth
            },
            json: {
                "InitiatorName": "apitest342",
                "SecurityCredential": "Q9KEnwDV/V1LmUrZHNunN40AwAw30jHMfpdTACiV9j+JofwZu0G5qrcPzxul+6nocE++U6ghFEL0E/5z/JNTWZ/pD9oAxCxOik/98IYPp+elSMMO/c/370Joh2XwkYCO5Za9dytVmlapmha5JzanJrqtFX8Vez5nDBC4LEjmgwa/+5MvL+WEBzjV4I6GNeP6hz23J+H43TjTTboeyg8JluL9myaGz68dWM7dCyd5/1QY0BqEiQSQF/W6UrXbOcK9Ac65V0+1+ptQJvreQznAosCjyUjACj35e890toDeq37RFeinM3++VFJqeD5bf5mx5FoJI/Ps0MlydwEeMo/InA==",
                "CommandID": "BusinessPayment",
                "Amount": "200",
                "PartyA": "601342",
                "PartyB": "254708374149",
                "Remarks": "Salary for December",
                "QueueTimeOutURL": "http://197.248.86.122:801/b2c_timeout_url",
                "ResultURL": "http://197.248.86.122:801/b2c_result_url",
                "Occasion": "DEC2019"
            }
        },
        function(error, response, body) {
            if (error) {
                console.log(error)
            } else {
                res.status(200).json(body)
            }
        }
    )
})

app.post('/b2c_result_url', (req, resp) => {
    // console.log("stk......")
    console.log(req.body.Result.ResultParameters, " B2C.......")


    // console.log("confirmation...")
})

app.post('/b2c_timeout_url', (req, resp) => {
    // console.log("stk......")
    console.log(req.body, " B2C....TIMEOUT...")


    // console.log("confirmation...")
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