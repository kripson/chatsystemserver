var fs = require('fs');

  module.exports = function(req,res){


    var users =    JSON.parse(fs.readFileSync('./data/users.js','utf-8'));
    var groups =   JSON.parse(fs.readFileSync('./data/groups.js','utf-8'));
    
    var responsebody = {};
    if(groups.hasOwnProperty(req.body.groupname) && groups[req.body.groupname].members.includes(req.body.username) && !groups[req.body.groupname].admins.includes(req.body.username))
    {
      groups[req.body.groupname].members = groups[req.body.groupname].members.filter(function(value){

                  return value != req.body.username;

              });
      groups[req.body.groupname].asis = groups[req.body.groupname].asis.filter(function(value){

                  return value != req.body.username;

              });

        fs.writeFileSync('./data/groups.js', JSON.stringify(groups));

         // removing the group from user's grouplist
         users[req.body.username].grouplist = users[req.body.username].grouplist.filter(function(value){

                  return value != req.body.username;

              });

          fs.writeFileSync('./data/users.js', JSON.stringify(users));

  
       
         responsebody.notice = "User removed";
         res.send(responsebody);
    }
    else
    {
         responsebody.notice = `User does not seem to be a part of group`;
         res.send(responsebody);
    }
}
