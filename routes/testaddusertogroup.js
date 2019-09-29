module.exports = function(dbo,app)
	
	{

    app.post('/addusertogroup',async function(req,res)
  {


      requestbody = req.body;


      var usercheck = await new Promise((resolve,reject)=>

      {

        var query = { username:requestbody.username};
          dbo.collection("users").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length == 0)
            {
              resolve(false);
            }
            else if (result.length && result[0].grouplist.includes(requestbody.groupname))
             {
                resolve(false);
             }
            else
            {
              resolve(true);
            }
          });




      });

      if(!usercheck)
    {
      var usercreate = {err:"User does not exist/ User is already a member"};
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

                                      query = {username:requestbody.username};
                                dbo.collection("users").find(query).toArray(function(err, result)
                                      {
                                        var user = result[0];
                                        var new_grouplist = user.grouplist;

                                        new_grouplist.push(requestbody.groupname);



                                        var newvalues = { $set: {grouplist: new_grouplist} };
                                  dbo.collection("users").updateOne(query, newvalues, function(err, res) {
                                      if (err) throw err;
                                      resolve({message:"User added to the group"});



                        
                                  });



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







  