const express = require('express');
const router = express.Router()
const tourController = require('../controllers/tour.controller')
router.route('/')

.get(tourController.getTours)
.post(tourController.createTours)

router.route("/bulk-update").patch(tourController.bulkUpdateTour)

router.route("/:id").patch(tourController.updateTour)
module.exports = router;