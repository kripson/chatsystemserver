module.exports = function(dbo,app)
	
	{

    app.post('/deletegroup',async function(req,res)
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
        var groupdeletion = await new Promise((resolve,reject)=>

      {

           query = { groupname:requestbody.groupname};
          dbo.collection("groups").deleteOne(query, function(err, obj) 
          {
            if (err) throw err;
            resolve({message:"Group deleted"});
          });




      });


       //updating users collection as well

      var userupdate = await new Promise((resolve,reject)=>

      {
          dbo.collection("users").find({ grouplist: { $all: [requestbody.groupname] } }).toArray(function(err, result)
          {
            if (err) throw err;

            result.forEach((user)=>
            {

               query = {username:user.username};
              var new_grouplist = [];
              var new_admingrouplist = [];

              user.grouplist.forEach((group,index)=>
              {
                if(group !== requestbody.groupname)
                {
                  new_grouplist.push(group);
                }

              });
              user.admingrouplist.forEach((group,index)=>
              {
                if(group !== requestbody.groupname)
                {
                  new_admingrouplist.push(group);
                }

              });


              var newvalues = { $set: {grouplist: new_grouplist, admingrouplist: new_admingrouplist } };
              dbo.collection("users").updateOne(query, newvalues, function(err, res) {
                        if (err) throw err;
                        if(user === result.pop())
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
        var groupdeletion = {err:"Group not found"};
      }
      

      res.send(groupdeletion);
  });
};

    