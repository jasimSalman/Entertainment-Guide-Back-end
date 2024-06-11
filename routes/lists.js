const express = require('express')
const router = express.Router()

const listsCtrl = require('../controlleres/lists')

router.get('/:palceId', listsCtrl.add)

router.get('/show/:userId', listsCtrl.index)

module.exports = router
