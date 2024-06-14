const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const bookingsCtrl = require('../controllers/bookings')

router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToekn,
  bookingsCtrl.index
)

router.post(
  '/:placeId/create/:userId',
  middleware.stripToken,
  middleware.verifyToekn,
  bookingsCtrl.create
)

router.get(
  '/all/:userId',
  middleware.stripToken,
  middleware.verifyToekn,
  bookingsCtrl.ownerBooking
)

module.exports = router
