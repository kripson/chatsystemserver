module.exports = function(dbo,app)
	
	{

    app.post('/removeuserfromchannel',async function(req,res)
  {


      requestbody = req.body;


    
      var groupcheck = await new Promise((resolve,reject)=>

      {

        var query = { groupname:requestbody.groupname};
          dbo.collection("groups").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length !== 0)
            {
              resolve(result[0]);
            }
            else
            {
              resolve(false);
            }
          });




      });

      if(groupcheck)
      {
        var group = groupcheck;
        var channels = group.channels;
        if(!group.admins.includes(requestbody.username))
        {
          if(channels.hasOwnProperty(requestbody.channelname) && channels[requestbody.channelname].members.includes(requestbody.username))
          {

            channels[requestbody.channelname].members.forEach((member,index)=>
            {
              if(member === requestbody.username)
              {
                channels[requestbody.channelname].members.splice(index,1);
              }


            });

            channels[requestbody.channelname].admins.forEach((admin,index)=>
            {
              if(admin === requestbody.username)
              {
                channels[requestbody.channelname].admins.splice(index,1);
              }


            });

            var removeuser = await new Promise((resolve,reject)=>
                    {
                      query = { groupname:requestbody.groupname};
                      var newvalues = { $set: {channels: channels } };
                      dbo.collection("groups").updateOne(query, newvalues, function(err, res) {

                        resolve({message: "User removed to the channel"});

                    });
                    });


          }
          else
          {
            var removeuser = {err:"User is not a member of the channel or the channel does not exist"}
          }
        }
        else
        {

          var removeuser = {err:"A group admin cannot be removed"};

        }
          



      }
      else
      {
        var removeuser = {err:"Group has been deleted"};
      }

      res.send(removeuser);
      });
  };
