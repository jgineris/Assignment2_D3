var graph = require('fbgraph'); 

var conf = {
    client_id:  	'385717044904347'    
  , client_secret:  'e1ccaddb495e90c4b9b37ba18ebc169e'
  , scope:          'user_about_me, user_birthday, user_location, friends_relationships'
  , redirect_uri:   'http://localhost:3000/auth/facebook'
};


exports.view = function(req, res) {
	res.render('fblogin');
}

exports.fbauthlogin = function(req, res) {

  if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    });
      
    if (!req.query.error) {
      res.redirect(authUrl);
    } else {
      res.send('access denied');
    }
    return;
  }

  // code is set
  // we'll send that and get the access token
  graph.authorize({
      "client_id":      conf.client_id
    , "redirect_uri":   conf.redirect_uri
    , "client_secret":  conf.client_secret
    , "code":           req.query.code
  }, function (err, facebookRes) {
    res.redirect('/fblogin');
  });
        
}

exports.fbuser = function(req, res){    
    graph.get("/me", function(err, res1) {
       console.log(res1);
       res.render('fblogin', res1);
    });
    
}

exports.fbrelationships = function(req, res){

    graph.get("/me/friends?fields=name,relationship_status", function(err, res1) {        
       var friends = [];
       friends = res1;
       var single = [];
       var undef = []; //Undefined
       var married = [];
       var divorced = [];
       var engaged = [];
       var domestic = []; //In a domestic partnership
       var rel = []; //In a relationship
       var nums = [];
    
       for(var i = 0; i < friends.data.length; i++){
           
           if(friends.data[i].relationship_status=="Single"){
                single.push(friends.data[i]);
           }           	
           else if (friends.data[i].relationship_status=="In a relationship"){
           		rel.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="Married"){
           		married.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="Engaged"){
           		engaged.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="Divorced"){
           		divorced.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="In a domestic partnership"){
           		domestic.push(friends.data[i]);
           }
           else {
				undef.push(friends.data[i]);
           }
           // console.log("status: "+ friends.data[i].relationship_status);

       }
        
       var percentage = single.length/friends.data.length;
       nums.push({
       		name: 'Single',
       		percent: percentage * 100});

       percentage = rel.length/friends.data.length;
        nums.push({
       		name: 'In a relationship',
       		percent: percentage * 100});

       percentage = married.length/friends.data.length;
        nums.push({
       		name: 'Married',
       		percent: percentage * 100});

       percentage = engaged.length/friends.data.length;
        nums.push({
       		name: 'Engaged',
       		percent: percentage * 100});

 	   percentage = divorced.length/friends.data.length;
        nums.push({
       		name: 'Divorced',
       		percent: percentage * 100});

       percentage = domestic.length/friends.data.length;
        nums.push({
       		name: 'In a domestic partnership',
       		percent: percentage * 100});

       percentage = undef.length/friends.data.length;
        nums.push({
       		name: 'Unspecified',
       		percent: percentage * 100});


       var percentData = [];


       friends.data = single;
       res.render('relationships', {'nums' : nums});
    });
    
}