const express = require('express');
const router = express.Router()
const tourController = require('../controllers/tour.controller')


router.route("/bulk-update").patch(tourController.bulkUpdateTour)
router.route("/bulk-delete").delete(tourController.bulkDeleteTour)


router.route('/')
.get(tourController.getTours)
.post(tourController.createTours)


router.route("/:id")
.patch(tourController.updateTourById)
.delete(tourController.deleteTourById)

module.exports = router;