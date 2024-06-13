const express = require('express')
const router = express.Router()

const listsCtrl = require('../controllers/lists')

router.post('/:placeId', listsCtrl.add)

router.get('/show/:userId', listsCtrl.index)

router.delete('/delete/:placeId', listsCtrl.delete)

module.exports = router
