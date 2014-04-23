var Twit = require('twit')

var T = new Twit({
    consumer_key:         '8fCQaBZbuH3GYC5FrieEVZs7D'
  , consumer_secret:      'VbMu9cm4NyZWmcz7vV1VBJn1JkXXec3vWy0sihou7JmC1pTDgL'
  , access_token:         '2445881906-UaJTL9MUkVmuMlWPsancA9r0FPFL5x5ZfzNeC1M'
  , access_token_secret:  'BPGs0OwIpGxuzswRbLFJcaKLT2nvfAwIuTYJtuf6JXQn3'
})

exports.view = function(req, res) {
  res.render('twitlogin');
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
        console.log(res1);  
        var data = [];
        data = res1;
        res.render('twitlogin', data[0]);
    });

}
