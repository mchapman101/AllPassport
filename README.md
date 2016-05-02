# AllPassport

A one stop-shop for all your Node Passport Authentication needs. Ready to login, signup, password reset, social login/signup? Welcome, then! Hopefully, AllPassport becomes the Node alternative to [Django AllAuth](https://github.com/pennersr/django-allauth).

AllPassport uses the [MEAN Stack](https://www.wikiwand.com/en/MEAN_(software_bundle)). The goal of AllPassport is to get you up and running fast with your app, whiles authentication is already taken care of. It handles the plumbing works for you. Just run and profit.

This repo was inspired by [Easy Node Authentication](https://github.com/scotch-io/easy-node-authentication) and [Social Authentication in NodeJS](http://mherman.org/blog/2015/09/26/social-authentication-in-node-dot-js-with-passport/) and builds upon them.

## Tweaks done
- Switched to `express.Router()` for easy url construction
- Separated routes into Auth, API and AngularJS single-page-app route
-- AngularJS app talks to API endpoints, when standard authentication is handled by Auth Router which is via Swig template engine



# What is it?

AllPassport is a combination of bits and pieces of the Passport authentication framework, cooked properly, with the needed spices using the right recipe.

In simple terms, AllPassport handles all your authentication needs. It uses Swig template engine to render the authentication aspects, then renders a template you could use in your actual app.


# What you get?
- **Social Authentication**: By default, AllPassport comes shipped with the ability to login via Local, Google, Facebook and Twitter
- **Passwords:* reset, change, forgotten, whatever
- **Emails:** set primary email, verify email and even verifying the web exist. The last one isn't true.
- Link/Unlink social accounts to local
- **One paged login/signup/social-login**. On a single page is all your authentication forms. Call it a 'one-stop shop'
- **Uses Swig** - Think of it as 'Swag'.
- **Seamless theme**: A seamless login/signup forms to match almost any theme of yours. You may throw in your favorites too.
- **Ooh dear, AngularJS**: Rigged to play nice with AngularJS. Continue building the app using the Swig template engine, or let AngularJS take over

# How do I do it then?
- Download this repo
- Change into directory. Do `npm install` and `bower install`. Bower libraries are stored in `/public/vendor`
- Then `gulp`
- Visit `localhost:3000`
- Open `angular.html` in the public folder and start building your AngularJS app straight up.
- Install any libraries needed in your AngularJS app via bower, then link them up simply by `/vendor/package_dir/package.min.js`

# Issues and Contributing
Open issues if any. Pull Requests are also welcomed.

## TODOs
- Make proper use of flash messages in templates
- Password reset
- Change password
- Email verification after sign up or login

# License
See the License file