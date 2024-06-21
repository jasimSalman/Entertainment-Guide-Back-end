const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const placesCtrl = require('../controllers/places')

router.post('/search', placesCtrl.search)

router.post(
  '/new/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.addPlace
)

router.put(
  '/:placeId',
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.updatePlace
)

router.delete(
  '/:placeId/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.deletePlace
)

router.get('/:placeId/reviews', placesCtrl.showReview)

router.get('/:placeId', placesCtrl.show)

router.get('/all/:userId', placesCtrl.addedPlaces)

router.post(
  '/:placeId/reviews/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.addReview
)

router.delete(
  '/:placeId/reviews/:reviewId',
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.deleteReview
)

module.exports = router
