const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const placesCtrl = require('../controllers/places')

router.get('/', placesCtrl.index)

router.post(
  '/new',
  middleware.stripToken,
  middleware.verifyToekn,
  placesCtrl.addPlace
) //add place

router.get('/:placeId/reviews', placesCtrl.showReview)

router.get('/:placeId', placesCtrl.show)

router.post(
  '/:placeId/reviews/:userId',
  middleware.stripToken,
  middleware.verifyToekn,
  placesCtrl.addReview
)

router.delete(
  '/:placeId/reviews/:reviewId',
  middleware.stripToken,
  middleware.verifyToekn,
  placesCtrl.deleteReview
)

router.put(
  '/:placeId',
  middleware.stripToken,
  middleware.verifyToekn,
  placesCtrl.updatePlace
) //update place

router.delete(
  '/:placeId',
  middleware.stripToken,
  middleware.verifyToekn,
  placesCtrl.deletePlace
) //delete place

module.exports = router
