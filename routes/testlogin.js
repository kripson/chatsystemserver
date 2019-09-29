module.exports = function(dbo,app)
	
	{

    app.post('/api/auth',async function(req,res)
  {


      requestbody = req.body;

		//See if super exists and if not create a collection and a super user

    var supercheck = await new Promise((resolve,reject)=>
    {
          var query = {username : "super"};

          dbo.collection("users").find(query).toArray(function(err, result) 
        {
          if (err) throw err;
          if(result.length)
          {
            resolve(true);
          }
          else
          {
            resolve(false);
          }


        });
    });

    if(supercheck)
    {
      var usercheck = await new Promise((resolve,reject)=>

      {

        var query = { username:requestbody.username,password:requestbody.password};
          dbo.collection("users").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length !== 0)
            {
              resolve(result[0]);
            }
            else
            {
              resolve("sorry, Your credentials don't match with any records");
            }
          });




      });
    }
    else
    {
      var usercheck = await new Promise((resolve,reject)=>
      {

        dbo.createCollection("users", function(err, result) {
        if (err) throw err;
        console.log("Collection created!");
        var first = {
                                          username:"super",
                                          birthdate:"00-00-0000",
                                          age:"999999",
                                          ofgroupadmin:true,
                                          grouplist:[],
                                          admingrouplist:[],
                                          email:"super@gmail.com",
                                          password:"super",
                                          valid:true
                        };
            dbo.collection("users").insertOne(first, function(err, result) {
            if (err) throw err;
            if(requestbody.username === "super" && requestbody.password === "super")
            {
              resolve(first);
            }
            resolve("sorry, Your credentials don't match with any records");

            })
          });
      });
    }

    res.send(usercheck);


  });
};


