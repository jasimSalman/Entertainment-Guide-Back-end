const express = require("express")
const router = express.Router()

const middleware = require("../middleware")
const placesCtrl = require("../controllers/places")
router.get("/:placeId/reviews", placesCtrl.showReview)

router.post(
  "/new/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.addPlace
) //add place

router.get("/:placeId/reviews", placesCtrl.showReview)

// router.get("/:placeId", placesCtrl.show)

router.post("/:placeId/reviews/:userId", placesCtrl.addReview)
router.post(
  "/:placeId/reviews/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.addReview
)

router.delete(
  "/:placeId/reviews/:reviewId",
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.deleteReview
)

router.put(
  "/:placeId",
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.updatePlace
) //update place

router.delete(
  "/:placeId/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  placesCtrl.deletePlace
) //delete place

router.get("/:placeId", placesCtrl.show)

module.exports = router
