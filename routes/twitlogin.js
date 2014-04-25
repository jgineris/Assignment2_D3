var Twit = require('twit')

var T = new Twit({
    consumer_key:         'GAbtK8b5o77AN3gD2G0elEu2t'
  , consumer_secret:      'Kbzt8PdWDSlAWtk7PhgWDNbvfQ7Vj4WDIZX5omedtnAtpZCJcr'
  , access_token:         '2445881906-bjRJfNKW0TTpSH1GiWSHfWhN4NLfRXgwDhJg0PX'
  , access_token_secret:  'ZFpoLjoeAY0CPOycSQ804K14708ULhPdn5671xJofWXk8'
})

exports.view = function(req, res) {
  console.log("HERE");
  res.render('twitlogin', res);
}
//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, reply) {
  //  ...
})

//
//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
//
T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, reply) {
  //  ...
})

//
//  get the list of user id's that follow @tolga_tezel
//
T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, reply) {
  //  ...
})

//
//  retweet a tweet with id '343360866131001345'
//
T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, reply) {
  //  ...
})

//
//  destroy a tweet with id '343360866131001345'
//
T.post('statuses/destroy/:id', { id: '343360866131001345' }, function (err, reply) {
  //  ...
})

//
// get `funny` twitter users
//
T.get('users/suggestions/:slug', { slug: 'funny' }, function (err, reply) {
  //  ...
})

exports.twitauthlogin = function(req, res) {
  T.get('statuses/user_timeline', function(err, res1){
        // console.log(res1);  
        var data = [];
        data = res1;
        res.render('twitlogin', data[0]);
        // res.redirect('twitlogin', data[0]);
    });

}
