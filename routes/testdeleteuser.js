module.exports = function(dbo,app)
	
	{

    app.post('/deleteuser',async function(req,res)
  {


      requestbody = req.body;

		var usercheck = await new Promise((resolve,reject)=>

      {

        var query = { username:requestbody.username};
          dbo.collection("users").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length !== 0)
            {
              resolve(true);
            }
            else
            {
              resolve(false);
            }
          });




      });

    if(usercheck)
    {
      var userdeletion = await new Promise((resolve,reject)=>

      {

        var query = { username:requestbody.username};
          dbo.collection("users").deleteOne(query, function(err, obj) 
          {
            if (err) throw err;
            resolve({message:"done"});
          });




      });

      //updating groups collection as well

      var groupupdate = await new Promise((resolve,reject)=>

      {
          dbo.collection("groups").find({ members: { $all: [requestbody.username] } }).toArray(function(err, result)
          {
            if (err) throw err;

            result.forEach((group)=>
            {

              var query = {groupname:group.groupname};
              var channels = group.channels;
              var new_members = [];
              var new_admins = [];
              var new_asis = [];

              group.members.forEach((member,index)=>
              {
                if(member !== requestbody.username)
                {
                  new_members.push(member);
                }

              });
              group.admins.forEach((admin,index)=>
              {
                if(admin !== requestbody.username)
                {
                  new_admins.push(admin);
                }

              });
              group.asis.forEach((asis,index)=>
              {
                if(asis !== requestbody.username)
                {
                  new_asis.push(asis);
                }

              });

              for(var channel in channels)
              {
                    channel.members.forEach((member,index)=>
                  {
                    if(member === requestbody.username)
                    {
                      channel.members.splice(index,1);
                    }

                  });
                     channel.admins.forEach((admin,index)=>
                  {
                    if(admin === requestbody.username)
                    {
                      channel.admins.splice(index,1);
                    }

                  });
              }


              var newvalues = { $set: {members: new_members, admins: new_admins,asis:new_asis,channels:channels } };
              dbo.collection("groups").updateOne(query, newvalues, function(err, res) {
                        if (err) throw err;
                        if(group === result.pop())
                        {
                          resolve("done");
                        }
                      });



            });
            
          });

    });
  }
  else
  {
    var userdeletion = {err:"User not found"};
  }

      res.send(userdeletion);
  });
};

    