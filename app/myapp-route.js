module.exports = function(express, path) {
    var myAppRouter = express.Router();
    myAppRouter.route('*')
        .get(function(req, res) {
            res.sendFile(path.resolve('./client/angular.html'), { 'user': req.user });
        });

    return myAppRouter;
}
