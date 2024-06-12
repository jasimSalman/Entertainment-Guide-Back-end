const express = require("express")
const router = express.Router()

const bookingsCtrl = require("../controllers/bookings")

// router.get('/:userId', bookingsCtrl.index)
// router.get("/", bookingsCtrl.index)
router.post("/:placeId/create", bookingsCtrl.create)

module.exports = router
