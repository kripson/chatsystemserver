var fs = require('fs');

  module.exports = function(req,res){
         
                   
              fs.readFile('./data/groups.js','utf8',function(err,data)
            {

                    // deleting group from group data file
                    var groups = JSON.parse(data);
                    delete groups[req.body.groupname];

                    //updating group data file
                    fs.writeFile('./data/groups.js', JSON.stringify(groups), function (err)
                    {

                                // removing the group from user group list

                                fs.readFile('./data/users.js','utf-8',function(err,data)
                                {
                                    if(err) 
                                    {
                                        
                                    }
                                    else
                                    {


                                    var users = JSON.parse(data);


                                    // removing group from user grouplist
                                    for(var user in users)
                                    {
                                        users[user].grouplist = users[user].grouplist.filter(function(value){

                                                        return value != req.body.groupname;

                                                    }); 
                                       
                                    }

                                    // removing group from user adminlist
                                    for(var user in users)
                                    {
                                        users[user].admingrouplist = users[user].admingrouplist.filter(function(value){

                                                        return value != req.body.groupname;

                                                    }); 
                                       
                                    }

                                    //updating users data file
                                     fs.writeFile('./data/users.js', JSON.stringify(users), function (err)
                                        {

                                            // Sending grouplist back to the deletor
                                          fs.readFile('./data/groups.js','utf-8', function(err,data)
                                                    {

                                                        if(err) throw err;
                                                        var groups = JSON.parse(data);
                                                        var totalgrouplist = {
                                                            grouplist : [],
                                                            admingrouplist:[]
                                                        };
                                                        for (var group in groups)
                                                        {
                                                            if(groups[group].members.includes(req.body.deletor))
                                                            {
                                                                totalgrouplist.grouplist.push(group);
                                                            }
                                                            if(groups[group].admins.includes(req.body.deletor))
                                                            {
                                                                totalgrouplist.admingrouplist.push(group);
                                                            }
                                                            
                                                        }
                                                     
                                                        res.send(totalgrouplist);


                                                            });
                                                        });
                                    }


                                });
                    });
            });

                  


};
