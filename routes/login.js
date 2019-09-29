var fs = require('fs');

  module.exports = function(req,res){
            var falseObj = 
            {
                username:"" ,
                birthdate:"" ,
                age:"",
                email:"",
                ofgroupadmin:false,
                grouplist:[],
                admingrouplist:[],
                password:"", 
                valid:false,
                userlist:[] 
            };
                    // Reading User data file and User authentication
              fs.readFile('./data/users.js','utf8',function(err,data)
            {
                if (err)
                {
                    console.log(err);
                    var users = {
                                super: {
                                          username:"super",
                                          birthdate:"00-00-0000",
                                          age:"999999",
                                          ofgroupadmin:true,
                                          grouplist:[],
                                          admingrouplist:[],
                                          email:"super@gmail.com",
                                          password:"super",
                                          valid:true
                                       }
                                };
                    fs.writeFile('./data/users.js', JSON.stringify(users), function (err) {
                                if (err) throw err;

                            
                                fs.readFile('./data/users.js','utf8',function(err,data)
                                {
                                    var users = JSON.parse(data);
                                
                                var responsebody ={};
                                var totaluserlist = [];             
                                for (var user in users)
                                {
                                    if(user != "super")
                                            {
                                                    totaluserlist.push(user);
                                            }
                                }
                                for (var user in users)
                                {
                                            if (req.body.username == users[user].username && req.body.password == users[user].password) 
                                        {
                                            if(req.body.username == "super")
                                            {
                                                users[user].userlist = totaluserlist;
                                            }
                                            else
                                            {
                                                users[user].userlist = [];
                                                
                                            }
                                            responsebody = users[user];
                                            
                                            
                                        }
                                }
                                        if (responsebody == {})
                                        {
                                            responsebody = falseObj;
                                        }
                                res.send(responsebody);

                    });
                            });


                }
                else
                {

                    var users = JSON.parse(data);
                    var totaluserlist = [];

                    var responsebody = {};
                    for (var user in users)
                    {
                        if(user != "super")
                        {
                                totaluserlist.push(user);
                        }
                        
                    }
                    for (var user in users)
                        {
                                            if (req.body.username == users[user].username && req.body.password == users[user].password) 
                                        {
                                            if(req.body.username == "super")
                                            {
                                                users[user].userlist = totaluserlist;
                                            }
                                            else
                                            {
                                                users[user].userlist = [];
                                                
                                            }
                                            responsebody = users[user];
                                            
                                            
                                        }
                                        
                                }
                                if (responsebody == {})
                                {
                                    responsebody = falseObj;
                                }
                        res.send(responsebody);
                }
            });
};