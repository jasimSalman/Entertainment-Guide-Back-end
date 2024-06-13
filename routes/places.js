const express = require('express')
const router = express.Router()

const placesCtrl = require('../controllers/places')

router.get('/', placesCtrl.index)

router.post('/new', placesCtrl.addPlace) //add place

router.get('/:placeId/reviews', placesCtrl.showReview)

router.get('/:placeId', placesCtrl.show)

router.post('/:placeId/reviews/:userId', placesCtrl.addReview)

router.delete('/:placeId/reviews/:reviewId', placesCtrl.deleteReview)

router.put('/:placeId', placesCtrl.updatePlace) //update place

router.delete('/:placeId', placesCtrl.deletePlace) //delete place

module.exports = router
