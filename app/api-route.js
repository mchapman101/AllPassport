module.exports = function(express) {
  var apiRouter = express.Router();

  apiRouter.route('/')
    .get(function(req, res) {
      res.json({
        response: 'API root directory',
      })
    })

  .post(function(req, res) {
    res.json({
      response: 'You posted ' + req.body
    })
  })

  apiRouter.route('/status')
    .get(function(req, res) {
      if (!req.isAuthenticated()) {
        return res.status(200).json({
          status: false
        });
      }
      res.status(200).json({
        status: true
      });
    });

  return apiRouter;
}
