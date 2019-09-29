module.exports = function(dbo,app)
	
	{

    app.post('/getuserdetails',async function(req,res)
  {


      requestbody = req.body;

		

      var getuserdetails = await new Promise((resolve,reject)=>

      {

        var query = { username:requestbody.username};
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

      res.send(getuserdetails);
  });
};