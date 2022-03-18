const Course = require('../model/Course')

class SiteController{
    //[GET] /news
    index(req, res, next){
        //callback
        // Course.find({}, function (err, courses) {
        //     if(!err){
        //         res.json(courses)
        //     }
        //     else{
        //         next(err)
        //     }
        //   });

        //promises
        Course.find({}).lean()
            .then(courses => {
                res.render('home', { courses })
            })
            .catch(err => next(err))
    }
    search(req, res){
        res.send('Search page')
    }
}
module.exports = new SiteController