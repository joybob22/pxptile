var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


app.listen(3000, function(){console.log("App listening on port 3000")})