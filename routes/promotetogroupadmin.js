var fs = require('fs');

  module.exports = function(req,res){
         
                   
              fs.readFile('./data/users.js','utf8',function(err,data)
            {
                    var users = JSON.parse(data);
                    var responsebody = {};
                    if(users.hasOwnProperty(req.body.username))
                    {
                      users[req.body.username].ofgroupadmin = true;
                      responsebody.notice = "Done";
                    }
                    else
                    {
                        responsebody.notice = "Failed";
                    }
                    
                     fs.writeFile('./data/users.js', JSON.stringify(users), function (err)
                    {
                        res.send(responsebody);

                    });


            });
            }
