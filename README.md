


<h1 align="center">
<br>
  <img src="/docs/logo.png" alt="Webcam Not a Toy" width="200">
</h1>

<p align="center">A webcamtoy website phishing to send photos in email</p>

<p align="center">
  <img src="/docs/page-1.png" width=490 title="Login">
  <img src="/docs/page-4.png" width=440 title="Login">
</p>
<br>

## photo --> your email

<p align="center">
  <img src="/docs/page-2.png" width=480 title="Login">
  <img src="/docs/page-3.png" width=450 title="Login">
</p>

## Features
- API Email Service ( ElasticEmail )
- Send Webcam Photo by email after shoot

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
