const User = require('../models/user')
const Place = require('../models/place')

const index = async (req, res) => {
  const userId = req.params.userId
  console.log(` User id ==> ${userId}`)

  const user = await User.findById(userId)
  console.log(`User from the DB == >${user}`)

  const lists = user.userList

  const places = await Place.find({ _id: { $in: lists } })

  res.send(places)
}

module.exports = { index }
