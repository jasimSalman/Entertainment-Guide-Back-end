const express = require("express")
const router = express.Router()

const listsCtrl = require("../controllers/lists")

router.get("/:palceId", listsCtrl.add)

router.get("/show/:userId", listsCtrl.index)

router.delete("/delete/:placeId", listsCtrl.delete)

module.exports = router
