// What to do?
// Resave this file as _config.js
// Do 'nano .gitignore' in terminal
// add '_config.js' at the of file
// save
// Come back and add your app's keys and Ids
var ids = {
  google: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    // can be localhost:3000
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },  
  facebook: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    // can be localhost:3000
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  twitter: {
    consumerKey: 'get_your_own',
    consumerSecret: 'get_your_own',
    // *MUST* be IP address
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
};

module.exports = ids;
