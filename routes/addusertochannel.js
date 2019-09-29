var fs = require('fs');

  module.exports = function(req,res){


    var users =    JSON.parse(fs.readFileSync('./data/users.js','utf-8'));
    var groups =   JSON.parse(fs.readFileSync('./data/groups.js','utf-8'));
    var responsebody = {};
    var username = req.body.username;
    var groupname = req.body.groupname;
    var channelname = req.body.channelname;
    if(users.hasOwnProperty(username) && groups.hasOwnProperty(groupname) && groups[groupname].channels.hasOwnProperty(channelname) && groups[groupname].members.includes(username) && !groups[groupname].channels[channelname].members.includes(username))
    {

        groups[groupname].channels[channelname].members.push(username);
        fs.writeFileSync('./data/groups.js', JSON.stringify(groups));

         
         
         responsebody.notice = "User added to the channel";
         res.send(responsebody);
    }
    else
    {
       
         responsebody.notice = "User cannot be added";
         res.send(responsebody);
    }
}

  