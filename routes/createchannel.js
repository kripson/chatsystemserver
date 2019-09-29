 var fs = require('fs');


module.exports = function(req,res)
{
  var responsebody = {};
fs.readFile('./data/groups.js','utf8',function(err,data)
            {
                  //Getting groups from groups data file
               		 var groups = JSON.parse(data);

                   // If the group exists and the channel does not already exists inside the group
                   if(groups.hasOwnProperty(req.body.groupname) && !groups[req.body.groupname].channels.hasOwnProperty(req.body.channelname))
                   {
                        var newchannel = 
                        {
                          channelname:req.body.channelname,
                          members : req.body.members,
                          admins : req.body.admins
                        }

                        // Add other admins of the group to the channel admin list and member list

                        for(var admin of groups[req.body.groupname].admins)
                        {
                          if(!newchannel.members.includes(admin))
                          {

                              newchannel.members.push(admin);
                          }
                          if(!newchannel.admins.includes(admin))
                          {
                            
                              newchannel.admins.push(admin);
                          }
                        }

               		      groups[req.body.groupname].channels[req.body.channelname] = newchannel;

                        //Updating the group data file
               		    	fs.writeFile('./data/groups.js', JSON.stringify(groups), function (err) {

                            responsebody.notice = "Done";
                            console.log(responsebody.notice);
                            res.send(responsebody);
                        })
                    }
                    else
                    {
                      responsebody.notice = "Failed";
                       console.log(responsebody.notice);
                      res.send(responsebody);
                    }
              })


                          
}
