const express = require('express')
const router = express.Router()

const listsCtrl = require('../controllers/lists')

router.get('/:palceId', listsCtrl.add)

router.get('/show/:userId', listsCtrl.index)

module.exports = router
