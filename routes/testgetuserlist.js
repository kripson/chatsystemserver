module.exports = function(dbo,app)
	
	{

    app.post('/getuserlist',async function(req,res)
  {


      requestbody = req.body;

		
      if(requestbody.username === "super")
      {
        var getuserlist = await new Promise((resolve,reject)=>

      {

          dbo.collection("users").find().toArray(function(err, result)
          {
            if (err) throw err;
            var users = [];
            result.forEach(function(user)
            {
              if(user.username !== "super")
              {
                users.push(user.username);
              }
              
            });

              resolve(users);
            
          });




      });
      }
      else
      {
        var getuserlist = [];
      }
      

      res.send(getuserlist);
  });
};