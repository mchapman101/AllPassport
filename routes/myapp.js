module.exports = function(express, path) {
    var myAppRouter = express.Router();
    myAppRouter.route('*')
        .get(function(req, res) {
            res.sendFile(path.resolve('./public/angular.html'));
        });

    return myAppRouter;
}
