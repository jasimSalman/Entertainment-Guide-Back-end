const express = require("express")
const router = express.Router()
const middleware = require("../middleware")
const listsCtrl = require("../controllers/lists")

router.post(
  "/:placeId",
  middleware.stripToken,
  middleware.verifyToken,
  listsCtrl.add
)

router.get(
  "/show/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  listsCtrl.index
)

router.delete(
  "/delete/:placeId",
  middleware.stripToken,
  middleware.verifyToken,
  listsCtrl.delete
)

module.exports = router
