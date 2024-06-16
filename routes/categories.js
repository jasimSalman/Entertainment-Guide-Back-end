const express = require("express")
const router = express.Router()
const categoriesCtrl = require("../controllers/categories")

router.get("/", categoriesCtrl.index)
router.get("/:categoryId/places", categoriesCtrl.show)

module.exports = router
