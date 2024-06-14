const User = require('../models/user')
const Place = require('../models/place')

//This function will show all the places in the user's favorite list.
const index = async (req, res) => {
  const userId = req.params.userId
  const user = await User.findById(userId)
  const lists = user.userList
  const places = await Place.find({ _id: { $in: lists } })
  res.send(places)
  //http://localhost:3001/list/show/userId
}

//This function is responsible for adding new places to the favorite list.
const add = async (req, res) => {
  try {
    const placeId = req.params.placeId
    const userId = req.params.userId

    const user = await User.findById(userId)
    user.userList.push(placeId)
    await user.save()
  } catch (e) {
    console.error(e)
  }
  //http://localhost:3001/list/placeId/userId
}

//This function is responsible for removing a place from the favorite list of the user.
const deleteFromTheList = async (req, res) => {
  const userId = req.params.userId
  const placeId = req.params.placeId
  const user = await User.findById(userId)
  const index = user.userList.indexOf(placeId)
  user.userList.splice(index, 1)
  await user.save()
  res.send(`Delete succefully`)
  //http://localhost:3001/list/delete/placeId/userId
}

module.exports = { index, add, delete: deleteFromTheList }
