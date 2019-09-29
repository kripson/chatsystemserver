module.exports = function(dbo,app)
	
	{

    app.post('/getgroupdetails',async function(req,res)
  {


      requestbody = req.body;

		

      var getgroupdetails = await new Promise((resolve,reject)=>

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
              resolve("sorry, The group does not exist");
            }
          });




      });

      res.send(getgroupdetails);
  });
};