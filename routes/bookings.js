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
// router.get("/", bookingsCtrl.index)
router.post(
  '/:placeId/create',
  middleware.stripToken,
  middleware.verifyToekn,
  bookingsCtrl.create
)

module.exports = router
