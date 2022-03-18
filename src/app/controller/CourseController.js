const Course = require('../model/Course')

class CourseController{
    index(req, res){
        res.render('home')
    }
    //[GET] /course/:slug
    show(req, res, next){
        Course.findOne({slug : req.params.slug}).lean()
            .then(courses => {
                if(courses == null){
                    res.send('404 page')
                }
                else{
                    res.render('courses/show', { courses })
                }
                // res.json(courses)
            })
            .catch(err => next(err))
    }
    //[GET] /course/create
    create(req, res, next){
        // const course = new Course(res.body)
        // res.json(req.body)
        res.render('courses/create')
    }

    //[POST] /course/store
    store(req, res, next){
        req.body.image = `https://i.ytimg.com/vi_webp/${req.body.videoId}/maxresdefault.webp`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/'))
    }
}
module.exports = new CourseController