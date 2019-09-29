var fs = require('fs');

  module.exports = function(req,res){
         
                   
              fs.readFile('./data/users.js','utf8',function(err,data)
            {
                if (err) throw err;
                    var users = JSON.parse(data);
                    delete users[req.body.username];
                    fs.writeFile('./data/users.js', JSON.stringify(users), function (err)
                    {
                        console.log("user deleted and user file updated");

                                // removing the user from group admin and members
                                fs.readFile('./data/groups.js','utf-8',function(err,data)
                                {
                                    if(err) 
                                    {
                                        console.log(err);
                                        fs.readFile('./data/users.js','utf-8', function(err,data)
                                    {
                                        if(err) throw err;
                                        var users = JSON.parse(data);
                                        var totaluserlist = {
                                            userlist : []
                                        };
                                        for (var user in users)
                                        {
                                            if(user!="super")
                                                {
                                                        totaluserlist.userlist.push(user);
                                                }
                                        }
                                        console.log(totaluserlist.userlist)
                                        res.send(totaluserlist);


                                            });
                                    }
                                    else
                                    {


                                    var groups = JSON.parse(data);
                                    for(var group in groups)
                                    {   
                                        var count = 0;
                                        for(x of groups[group].admins)
                                        {
                                        
                                            if(x == req.body.username)
                                            {
                                                groups[group].admins.splice(count,1);
                                            }
                                            count = count + 1;

                                        }
                                        count = 0;
                                        for(x of groups[group].members)
                                        {
                                        
                                            if(x == req.body.username)
                                            {
                                                groups[group].members.splice(count,1);
                                            }
                                            count = count + 1;

                                        }
                                        count = 0;
                                        for(x of groups[group].asis)
                                        {
                                        
                                            if(x == req.body.username)
                                            {
                                                groups[group].asis.splice(count,1);
                                            }
                                            count = count + 1;

                                        }
                                    }

                                     fs.writeFile('./data/groups.js', JSON.stringify(groups), function (err)
                                        {
                                            console.log("user deleted and groups file updated");
                                            fs.readFile('./data/users.js','utf-8', function(err,data)
                                    {
                                        if(err) throw err;
                                        var users = JSON.parse(data);
                                        var totaluserlist = {
                                            userlist : []
                                        };
                                        for (var user in users)
                                        {
                                           if(user!="super")
                                                {
                                                        totaluserlist.userlist.push(user);
                                                }
                                        }
                                        console.log(totaluserlist.userlist)
                                        res.send(totaluserlist);


                                            });
                                        });
                                 }
                                });
                      });
            });

                  


            };
