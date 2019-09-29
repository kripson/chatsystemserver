module.exports = function(dbo,app)
	
	{

    app.post('/createchannel',async function(req,res)
  {


      requestbody = req.body;


      var groupcheck = await new Promise((resolve,reject)=>

      {

        var query = { groupname:requestbody.groupname};
          dbo.collection("groups").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length !== 0 && !result[0].channels.hasOwnProperty(requestbody.channelname))
            {
              resolve(true);
            }
            else
            {
              resolve(false);
            }
          });
      });

      if(groupcheck)
      {

        var channelcreate = await new Promise((resolve,reject)=>
      {
        var new_channel =  {
                              channelname:req.body.channelname,
                              members : req.body.members,
                              admins : req.body.admins

                          };

                                              
                  query = {groupname:requestbody.groupname};
                  dbo.collection("groups").find(query).toArray(function(err, result)
                        {
                          var group = result[0];
                          var new_channels = group.channels;
                          

                          // Add other admins of the group to the channel admin list and member list

                        for(var admin of group.admins)
                        {
                          if(!new_channel.members.includes(admin))
                          {

                              new_channel.members.push(admin);
                          }
                          if(!new_channel.admins.includes(admin))
                          {
                            
                              new_channel.admins.push(admin);
                          }
                        }

                        new_channels[requestbody.channelname] = new_channel;

                          var newvalues = { $set: {channels: new_channels} };
              dbo.collection("groups").updateOne(query, newvalues, function(err, res) {

                  if(err) throw err;
                  resolve({message:"Channel Created"});
                });
            });
        });
      }
      else
      {
        var channelcreate = {err:"Group is deleted or the channel already exists"}
      }
      res.send(channelcreate);

      });
    };
          
