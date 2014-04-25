var graph = require('fbgraph'); 

var conf = {
    client_id:  	'722501874439273'    
  , client_secret:  '328e8df145d09a5750427ede6c6d449d'
  , scope:          'user_about_me, user_birthday, user_location, friends_relationships'
  , redirect_uri:   'http://still-chamber-7577.herokuapp.com/auth/facebook'
};


// exports.view = function(req, res) {
// 	res.render('fblogin');
// }

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
       //console.log(res1);
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
       var open = []; //In an open relationship
       var compl = []; //It's complicated
       var sep = []; //Separated
       var wid = []; //Widowed

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
           else if (friends.data[i].relationship_status=="In an open relationship"){
              open.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="It's complicated"){
              compl.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="Separated"){
              sep.push(friends.data[i]);
           }
           else if (friends.data[i].relationship_status=="Widowed"){
              wid.push(friends.data[i]);
           }
           else {
				      undef.push(friends.data[i]);
           }
       }
        
       var percentage = single.length/friends.data.length;
       nums.push({
          index: "i0",
       		name: 'Single',
       		percent: percentage * 100});

       percentage = rel.length/friends.data.length;
        nums.push({
          index: "i1",
       		name: 'In a relationship',
       		percent: percentage * 100});

       percentage = married.length/friends.data.length;
        nums.push({
          index: "i2",
       		name: 'Married',
       		percent: percentage * 100});

       percentage = engaged.length/friends.data.length;
        nums.push({
          index: "i3",
       		name: 'Engaged',
       		percent: percentage * 100});

 	     percentage = divorced.length/friends.data.length;
        nums.push({
          index: "i4",
       		name: 'Divorced',
       		percent: percentage * 100});

       percentage = domestic.length/friends.data.length;
        nums.push({
          index: "i5",
       		name: 'In a domestic partnership',
       		percent: percentage * 100});

      percentage = open.length/friends.data.length;
        nums.push({
          index: "i6",
          name: 'In an open relationship',
          percent: percentage * 100});

        percentage = compl.length/friends.data.length;
        nums.push({
          index: "i7",
          name: 'It\'s complicated',
          percent: percentage * 100});

        percentage = sep.length/friends.data.length;
        nums.push({
          index: "i8",
          name: 'Separated',
          percent: percentage * 100});

        percentage = wid.length/friends.data.length;
        nums.push({
          index: "i9",
          name: 'Widowed',
          percent: percentage * 100});

       percentage = undef.length/friends.data.length;
        nums.push({
          index: "i10",
       		name: 'Unspecified',
       		percent: percentage * 100});


       var percentData = [];


       friends.data = single;
       res.render('relationships', {'nums' : nums});
    });
    
}