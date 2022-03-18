const Course = require('../model/Course')

class MeController{
    
    //[GET] /me/stored/course
    stored(req, res, next){

        let courseQuery = Course.find({}).lean()

        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCourses]) => {
                res.render('me/stored', { deletedCourses, courses })
            })
            .catch(next)

        // Course.countDocumentsDeleted()
        //     .then(deletedCourses => {
        //         console.log(deletedCourses);
        //     })
        //     .catch(next)

        // Course.find({}).lean()
        //     .then(courses => {
        //         res.render('me/stored', { courses })
        //         // res.json(courses)
        //     })
        //     .catch(err => next(err))
    }

    //[GET] /me/stored/edit
    edit(req, res, next){
        Course.findById(req.params.id).lean()
            .then(course => {
                res.render('me/edit', { course })
                // res.json(courses)
            })
            .catch(err => next(err))
    }

    //[POST] /me/stored/update/:id
    update(req, res, next){
        Course.findOneAndUpdate({ _id: req.params.id}, req.body)
            .then(
                () => res.redirect('/me/stored/courses')
            )
            .catch(err => next(err))
       
    }

    //[DELETE] /me/stored/delete/:id
    delete(req, res, next){
        Course.delete({ _id: req.params.id})
            .then(
                () => res.redirect('back')
            )
            .catch(err => next(err))
       
    }

    //[GET] /me/trash/coures
    softDeleteStored(req, res, next){
        Course.findDeleted({}).lean()
            .then(courses => {
                res.render('me/softDeleteStored', { courses })
            })
            .catch(err => next(err))
    }

    //[PATCH] /me/trash/restore/:id
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(
                () => res.redirect('back')
            )
            .catch(err => next(err))
    }

    //[DELETE] /me/trash/forceDelete/:id
    destroy(req, res, next){
        Course.deleteOne({ _id: req.params.id})
            .then(
                () => res.redirect('back')
            )
            .catch(err => next(err))
       
    }

    //[POST] /me/stored/actionCourse
    actionCourses(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id: req.body.checkCourse})
                    .then(
                        () => res.redirect('back')
                    )
                    .catch(err => next(err))
                break
            default:
                res.json({message: 'error'})
        }
       
    }

    //[POST] /me/trash/trashActionCoures
    trashActionCoure(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.deleteOne({ _id: req.body.checkCourse})
                    .then(
                        () => res.redirect('back')
                    )
                    .catch(err => next(err))
                break
            default:
                res.json({message: 'error'})
        }
       
    }


}
module.exports = new MeController