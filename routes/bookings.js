const express = require("express")
const router = express.Router()
const middleware = require("../middleware")
const bookingsCtrl = require("../controllers/bookings")

router.get(
  "/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  bookingsCtrl.index
)
// router.get("/", bookingsCtrl.index)
router.post(
  "/:placeId/create",
  middleware.stripToken,
  middleware.verifyToken,
  bookingsCtrl.create
)

module.exports = router
