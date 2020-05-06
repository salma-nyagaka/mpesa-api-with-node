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

  let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  let auth = new Buffer().toString('base64')

  //takes two parameters one that we are sending to mpesa
  request(
    {
      url: url,
      headerd: { Authorization: 'Basic' + auth }
    },
    (error, response, body) => {
      if (error) {
        console.log(error)
      } else {
        res.status(200).json(body)
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
