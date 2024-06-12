const express = require('express')
const router = express.Router()

const placesCtrl = require('../controllers/places')

router.get('/', placesCtrl.index)

router.get('/:placeId/reviews', placesCtrl.showReview)

router.get('/:placeId', placesCtrl.show)

router.post('/:placeId/reviews/:userId', placesCtrl.addReview)

router.delete('/:placeId/reviews/:reviewId', placesCtrl.deleteReview)

module.exports = router
