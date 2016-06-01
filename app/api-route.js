module.exports = function(app, passport) {
  app.get('/api', function(req, res) {
    res.json({
      response: 'API root directory',
    })
  })

  app.post('/api', function(req, res) {
    res.json({
      response: 'You posted ' + req.body
    })
  })

  app.get('/api/status', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.json({
        status: true,
        user: req.user
      });
      next();
    }
  });
}
