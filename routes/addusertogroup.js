var fs = require('fs');

  module.exports = function(req,res){


    var users =    JSON.parse(fs.readFileSync('./data/users.js','utf-8'));
    var groups =   JSON.parse(fs.readFileSync('./data/groups.js','utf-8'));

    var requestinfo = req.body;
    var groupname = requestinfo.groupname;
    var isofasis = requestinfo.ofgroupasis;
    var creator = requestinfo.creator;
    var responsebody = {};
    if(users.hasOwnProperty(req.body.username) && users[req.body.username].grouplist.includes(groupname) == false && groups.hasOwnProperty(groupname))
    {
         users[req.body.username].grouplist.push(groupname);
        fs.writeFileSync('./data/users.js', JSON.stringify(users));

         // adding the user to desired group
         groups = JSON.parse(fs.readFileSync('./data/groups.js','utf-8'));
                        
          groups[groupname].members.push(req.body.username);
          if(isofasis)
          {
          groups[groupname].asis.push(req.body.username);
          }
          fs.writeFileSync('./data/groups.js', JSON.stringify(groups));

        users = JSON.parse(fs.readFileSync('./data/users.js','utf-8'));
        var userlist = [];
        for (var user in users)
        {
            if(user!="super" && creator == "super")
                   {
                           userlist.push(user);
                   }
        }
         responsebody.userlist = userlist;
         responsebody.notice = "User added to the group";
         res.send(responsebody);
    }
    else
    {
        var userlist = [];
        for (var user in users)
        {
            if(user!="super" && creator == "super")
                   {
                           userlist.push(user);
                   }
        }
         responsebody.userlist = userlist;
         responsebody.notice = "User cannot be added. Either user does not exist or is already a member of the group";
         res.send(responsebody);
    }
}

  