module.exports = function(dbo,app)
	
	{

    app.post('/addusertochannel',async function(req,res)
  {


      requestbody = req.body;


      var usercheck = await new Promise((resolve,reject)=>

      {

        var query = { username:requestbody.username};
          dbo.collection("users").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length === 0)
            {
              resolve(false);
            }
            else
            {
              resolve(true);
            }
          });
      });



      if(usercheck)

      {
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
          var members = group.members;

          if(channels.hasOwnProperty(requestbody.channelname) && !channels[requestbody.channelname].members.includes(requestbody.username))
          {

            channels[requestbody.channelname].members.push(requestbody.username);
            if(!members.includes(requestbody.username))
            {
                members.push(requestbody.username);
            }
            var channelupdate = await new Promise((resolve,reject)=>
                    {
                      var newvalues = { $set: {channels: channels ,members:members} };
                      dbo.collection("groups").updateOne({groupname:requestbody.groupname}, newvalues, function(err, res) {

                        resolve({message: "User added to the channel"});

                    });
                    });
          }
          else
          {
            var channelupdate = {err : "User is already a member of the channel or the channel is deleted"};
          }

        }
        else
        {
          var channelupdate = {err:"Group doesnot exist"};
        }

      }
      else
      {
        var channelupdate = {err:"User does not exist"};
      }
    res.send(channelupdate);
  });
};
