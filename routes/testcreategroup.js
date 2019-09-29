module.exports = function(dbo,app)
	
	{

    app.post('/creategroup',async function(req,res)
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
      var groupcreate = {err:"Group already exists"};
    }
    else
    {
      var groupcreate = await new Promise((resolve,reject)=>
      {
        var newgroup = {
                                          groupname: requestbody.groupname,
                                          creator: requestbody.creator,
                                          admins: requestbody.admins,
                                          asis: requestbody.asis,
                                          channels: requestbody.channels,
                                          members: requestbody.members
                        };
            dbo.collection("groups").insertOne(newgroup, function(err, result) {
            if (err) throw err;
            resolve({message:"Group created"});

            });
          });
    }


    //updating the user collection as well

      var userupdate = await new Promise((resolve,reject)=>

      {
          dbo.collection("users").find().toArray(function(err, result)
          {
            if (err) throw err;

            result.forEach((user)=>
            {
              var query = {username:user.username};
              var new_grouplist = user.grouplist;
              var new_admingrouplist = user.admingrouplist;
              
              if(requestbody.admins.includes(user.username))
              {
                new_admingrouplist.push(requestbody.groupname);
              }
              if(requestbody.members.includes(user.username))
              {
                new_grouplist.push(requestbody.groupname);
              }

              var newvalues = { $set: {grouplist: new_grouplist, admingrouplist: new_admingrouplist} };
              dbo.collection("users").updateOne(query, newvalues, function(err, res) {
                        if (err) throw err;
                        resolve('done');
                      });



            });
            
          });




      });
  
    res.send(groupcreate);
  });
};





