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

  return apiRouter;
}