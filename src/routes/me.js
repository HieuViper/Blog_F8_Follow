const express = require('express')
const router = express.Router()

const meController = require('../app/controller/MeController')

router.get('/stored/courses', meController.stored )
router.post('/stored/actionCourses', meController.actionCourses )
router.get('/stored/edit/:id', meController.edit )
router.post('/stored/update/:id', meController.update )
router.delete('/stored/delete/:id', meController.delete )
router.get('/trash/courses', meController.softDeleteStored )
router.post('/trash/trashActionCoure', meController.trashActionCoure )
router.patch('/trash/restore/:id', meController.restore )
router.delete('/trash/forceDelete/:id', meController.destroy )

module.exports = router