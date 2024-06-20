const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const bookingsCtrl = require('../controllers/bookings')

router.get(
  '/all-bookings',
  middleware.stripToken,
  middleware.verifyToken,
  bookingsCtrl.allBooking
)

router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  bookingsCtrl.index
)

router.post(
  '/:placeId/create/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  bookingsCtrl.create
)

router.get(
  '/all/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  bookingsCtrl.ownerBooking
)

module.exports = router
