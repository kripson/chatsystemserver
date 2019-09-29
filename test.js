var assert = require('assert');
var app = require('./server.js');
const request = require('request');



describe('Server test', function() {
    var testbody = {};
    // The function passed to before() is called before running the test cases.
    before(function() {
        console.log("before test");
    });

    // The function passed to after() is called after running the test cases.
    after(function() {
        console.log(testbody);
    });


    describe('user authentication', function() {
        it('should return a user object', function(done) {
           

            var requestbody = 
            {
                "username" : "super"

            };


            request.post('http://localhost:3000/api/auth', { json: requestbody }, (err, res, body) => {
            if (err) { return done(err)};
            assert.equal(body.username,"super");
            console.log(body.username);
                
            done();
            });
          

        });

        it('should not return a user object', function(done) {
           

            var requestbody = 
            {
                "username" : "user"

            };


            request.post('http://localhost:3000/api/auth', { json: requestbody }, (err, res, body) => {
            if (err) { return done(err)};
            assert.equal(body,"sorry,asdas Your credentials don't match with any records");
            console.log(body);
                
            done();
            });
          

        });
    });
});