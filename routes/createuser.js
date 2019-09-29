var fs = require('fs');


 module.exports = function(req,res){
fs.readFile('./data/users.js','utf8',function(err,data)
            {
                if (err)
                {
                    console.log(err);
                }
               	else
               	{
                    //getting users from users data file
               		 var users = JSON.parse(data);
                   var newusername = req.body.username

                   //checking if user already exists

                   // if user does not exist, update user datafile and send userlist back to creator 
                   if(!users.hasOwnProperty(req.body.username))
                   {

                      users[newusername] = req.body;
                      fs.writeFile('./data/users.js', JSON.stringify(users), function (err)
                            {

                        fs.readFile('./data/users.js','utf-8', function(err,data)
                                {
                                  var users = JSON.parse(data);
                                    var totaluserlist = 
                                    {
                                      userlist : [],
                                      notice:"user created"
                                    };
                                    for (var user in users)
                                    {
                                        if(user != "super")
                                                  {
                                                          totaluserlist.userlist.push(user);
                                                  }
                                    }
                                    res.send(totaluserlist);


                                });

                             });
                    }
                    // else if user exists notify user and send the userlist back to the originator
                    else
                    {
                      fs.readFile('./data/users.js','utf-8', function(err,data)
                                {
                                  var users = JSON.parse(data);
                                    var totaluserlist = 
                                    {
                                      userlist : [],
                                      notice:"user already exists"
                                    };
                                    for (var user in users)
                                    {
                                        if(user != "super")
                                                  {
                                                          totaluserlist.userlist.push(user);
                                                  }
                                    }
                                    res.send(totaluserlist);

                          });

                   
               	    }
                  }
               });

               
              };