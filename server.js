'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var https = require('https');
var fs = require('fs'),
    path = require('path');
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

var mssql = require('mssql');


restService.post('/updatedb',function( req,res ){
    console.log( "Email : " + req.body.email );
    console.log( "Email : " + JSON.stringify(req.body) );
});

restService.listen((process.env.PORT || 9000), function() {
  console.log("Server up and listening");
});