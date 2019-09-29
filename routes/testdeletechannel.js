module.exports = function(dbo,app)
	
	{

    app.post('/deletechannel',async function(req,res)
  {


      requestbody = req.body;


      var channeldeletion = await new Promise((resolve,reject)=>

      {

        var query = { groupname:requestbody.groupname};
          dbo.collection("groups").find(query).toArray(function(err, result)
          {
            if (err) throw err;

            if(result.length !== 0 && result[0].channels.hasOwnProperty(requestbody.channelname))
            {
              
              delete result[0].channels[requestbody.channelname];
              resolve({message:"Channel deleted"});

            }
            else
            {
              resolve({err:"Channel not found"});
            }
          });
      });

      
        res(channeldeletion);

    });
  };
