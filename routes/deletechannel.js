 var fs = require('fs');


module.exports = function(req,res)
{
  var responsebody = {};
fs.readFile('./data/groups.js','utf8',function(err,data)
            {
                  //Getting groups from groups data file
                     var groups = JSON.parse(data);

                   // If the group exists and the channel exists inside the group
                   if(groups.hasOwnProperty(req.body.groupname) && groups[req.body.groupname].channels.hasOwnProperty(req.body.channelname))
                   {
                          //deleting the desired channel
                          delete groups[req.body.groupname].channels[req.body.channelname]; 
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
