window.GiphySearchController = (() => {

this.askImgur = function(req, res) {
  var img_data;
  console.log('askImgur function firing');
  var search_term = url.parse(req.originalUrl||req.path).query;
  console.log(search_term);
  var search_path = path + search_term;//PLUS PAGE

  var options = {
    protocol: "https:",
    host:'api.imgur.com',
    path:search_path,
    method:'GET',
    headers: {
    "Authorization":"Client-ID <CLIENT ID HERE>"
    }
  };

var ds;
  https.get(options, function(res) {
    console.log("Got response: " + res.statusCode);
    for (var key in res) {
      if (res.hasOwnProperty(key)) {
      console.log(key);
      }
    }
  }).on('data', function(chunk){
    ds+=chunk;
    console.log("chunk is "+chunk);//does nothing
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
  console.log("ds is "+ds);//does nothing
  //res.json("askImgur function is sending you words");
  res.send(search_term);
};//askImgur function
})();