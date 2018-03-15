'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var cors = require('cors');

restService.use(cors());

var https = require('https');
var fs = require('fs'),
    path = require('path');
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

var SendEmail = require('./sendEmail');
var sql = require('mssql');

var emailContent = {};

restService.post('/updatedb',function( req,res ){
    try{
        console.log( "Email : " + req.body.email );
        var emailId = req.body.email;
        console.log( "Email : " + JSON.stringify(req.body) );
        var sqlConfig = {
            user: 'viki',
            password: 'Oracle123',
            server: 'vikisql.c1abev5luwmn.us-west-1.rds.amazonaws.com',
            database: 'viki'

        }
        var qString = "";

        qString = "INSERT INTO Subscribers (email) VALUES ('" + emailId + "')";


        sql.connect(sqlConfig, function(err) {
            var request = new sql.Request();
            request.query( qString, function(err, output) {
                if (err){ console.log(err); }
                else{
                    console.log(output); // Result in JSON format
                }
                sql.close();
                
                emailContent.toemail = emailId;
                emailContent.subject = "Thank you for Subscribing";
                emailContent.body = '<p><b>Hello Subscriber,</b></p>' +
                    '<p>Thank you for subscribing. We will keep you updated.</p>' +
                    '<p>Thanks,<br><b>Viki</b></p>';

                SendEmail( emailContent, req, res, function(eresult) {
                    console.log("SendEmail Called");
                });
            });
        });
    }
    catch(e){
        console.log("Error : " + e);
        res.json({"status":"error"});
    }
    
});

restService.listen((process.env.PORT || 9000), function() {
  console.log("Server up and listening");
});