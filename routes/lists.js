const express = require('express')
const router = express.Router()

const listsCtrl = require('../controlleres/lists')

router.get('/:userId', listsCtrl.index)

module.exports = router
