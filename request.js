var app = require('./server.js');
const request = require('request');


var requestbody = 
            {
                "username" : "super"

            };

request.post('http://localhost:3000/api/auth', { json: requestbody }, (err, res, body) => {
            if (err) { return console.log(err); }
                console.log(body);

            });
