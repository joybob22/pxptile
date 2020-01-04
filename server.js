var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var nodemailer = require('nodemailer');
require('dotenv').config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.post('/sendEmail', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_RECIEVER,
        subject: req.body.firstName + " " + req.body.lastName,
        text: req.body.content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send(error);
          res.end();
        } else {
          res.send('success');
          res.end();
        }
      });
})




app.listen(3000, function(){console.log("App listening on port 3000")})