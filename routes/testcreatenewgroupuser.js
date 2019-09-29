module.exports = function(dbo,app)
	
	{

    app.post('/createnewgroupuser',async function(req,res)
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
      var usercreate = {err:"User already exists"};
    }
    else
    {



      var groupcheck = await new Promise((resolve,reject)=>

      {

        query = { groupname:requestbody.groupname};
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
        var usercreate = await new Promise((resolve,reject)=>
      {


        //creating the new user and storing it in user collection
        var newuser = {
                                          username:requestbody.username,
                                          birthdate:requestbody.birthdate,
                                          age:requestbody.age,
                                          ofgroupadmin:requestbody.ofgroupadmin,
                                          grouplist:requestbody.grouplist,
                                          admingrouplist:requestbody.admingrouplist,
                                          email:requestbody.email,
                                          password:requestbody.password,
                                          valid:requestbody.valid
                        };
            dbo.collection("users").insertOne(newuser, function(err, result) {
                  if (err) throw err;

                  query = {groupname:requestbody.groupname};
                  dbo.collection("groups").find(query).toArray(function(err, result)
                        {
                          var group = result[0];
                          var new_members = group.members;
                          var new_asis = group.asis;


                          new_members.push(requestbody.username);
                          if(requestbody.ofgroupasis)
                          {
                            new_asis.push(requestbody.username);
                          }



                          var newvalues = { $set: {members: new_members, asis: new_asis } };
                    dbo.collection("groups").updateOne(query, newvalues, function(err, res) {
                        if (err) throw err;
                        resolve({message:"User created and added to the group"});
                      });



                        });
          });


      });
      }
      else
      {
        var usercreate = {err:"Group does not exist"};
      }

    }
    res.send(usercreate);
  });
  };







  