const express = require('express')
const router = express.Router()

//Admin or owner not sure yet
const adminsCtrl = require('../controllers/admins')

// router.get('/', adminsCtrl.index)
// router.post('/new', adminsCtrl.create)
// router.post('/:placeId', adminsCtrl.delete)
// router.post('/:placeId', adminsCtrl.update)

module.exports = router
