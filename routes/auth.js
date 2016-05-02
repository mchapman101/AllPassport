module.exports = function(express, app, passport) {
    var authRoute = express.Router();
    // show the home page (will also have our login links)
    // authRoute.route('/')
    //     .get(function(req, res) {
    //         res.render('index', { user: req.user });
    //     });

    // PROFILE SECTION =========================
    authRoute.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.render('profile', {
                user: req.user
            });
        });

    // LOGOUT ==============================
    authRoute.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
        });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    authRoute.route('/login')
        .get(function(req, res) {
            res.render('login', {
                user: req.user,
                error: req.flash('error'),
                active: 'login'
            });
        })
        // process the login form
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

    // SIGNUP =================================
    // show the signup form
    authRoute.route('/register')
        .get(function(req, res) {
            // redirects to 'login'. Login & Signup on same page
            res.render('login', { active: 'register' });
        })
        // process the signup form
        .post(passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

    // Highlights social login section in the
    // Login/Signup box
    authRoute.route('/social-login')
        .get(function(req, res) {
            res.render('login', { active: 'social' })
        });

    // facebook -------------------------------
    // send to facebook to do the authentication
    authRoute.route('/auth/facebook')
        .get(passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    authRoute.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------
    // send to twitter to do the authentication
    authRoute.route('/auth/twitter')
        .get(passport.authenticate('twitter', { scope: 'email' }));

    // handle the callback after twitter has authenticated the user
    authRoute.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------
    // send to google to do the authentication
    authRoute.route('/auth/google')
        .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    authRoute.route('/auth/google/callback')
        .get(passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    authRoute.route('/connect/local')
        .get(function(req, res) {
            res.render('connect-local', { message: req.flash('loginMessage') });
        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    authRoute.route('/connect/facebook')
        .get(passport.authorize('facebook', { scope: 'email' }))

    // handle the callback after facebook has authorized the user
    authRoute.route('/connect/facebook/callback')
        .get(passport.authorize('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    authRoute.route('/connect/twitter')
        .get(passport.authorize('twitter', { scope: 'email' }));

    // handle the callback after twitter has authorized the user
    authRoute.route('/connect/twitter/callback')
        .get(passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    authRoute.route('/connect/google')
        .get(passport.authorize('google', { scope: ['profile', 'email'] }));

    // the callback after google has authorized the user
    authRoute.route('/connect/google/callback')
        .get(passport.authorize('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    authRoute.route('/unlink/local')
        .get(isLoggedIn, function(req, res) {
            var user = req.user;
            user.local.email = undefined;
            user.local.password = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

    // facebook -------------------------------
    authRoute.route('/unlink/facebook')
        .get(isLoggedIn, function(req, res) {
            var user = req.user;
            user.facebook.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

    // twitter --------------------------------
    authRoute.route('/unlink/twitter')
        .get(isLoggedIn, function(req, res) {
            var user = req.user;
            user.twitter.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

    // google ---------------------------------
    authRoute.route('/unlink/google')
        .get(isLoggedIn, function(req, res) {
            var user = req.user;
            user.google.token = undefined;
            user.save(function(err) {
                res.redirect('/profile');
            });
        });

    return authRoute;
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
