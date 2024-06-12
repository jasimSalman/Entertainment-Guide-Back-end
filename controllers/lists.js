const User = require("../models/user")
const Place = require("../models/place")

const index = async (req, res) => {
  console.log(`The request == >${req}`)
  const userId = req.params.userId
  console.log(`User id ==> ${userId}`)
  const user = await User.findById(userId)
  console.log(`User from the DB == >${user}`)
  const lists = user.userList
  const places = await Place.find({ _id: { $in: lists } })

  res.send(places)
}

const add = async (req, res) => {
  try {
    const palceId = req.params.palceId
    const userId = "6669861eefdcb09ab5eb3e27"
    const user = await User.findById(userId)
    console.log(`User id from the request  ${user}`)
    user.userList.push(palceId)
    await user.save()
    res.send("Saves succefully ")
  } catch (e) {
    console.error(e)
  }
}

const deleteFromTheList = async (req, res) => {
  // const userId = req.params.id
  const userId = "6669e49d01eed5b23c45afe1"
  const user = await User.findById(userId)
  const placeId = req.body.placeId
  const index = user.userList.indexOf(placeId)
  user.userList.splice(index, 1)
  await user.save()
  res.send(`Delete succefully`)
  //http://localhost:3001/list/delete/666986d29ec4234646f4e9ad
}

module.exports = { index, add, delete: deleteFromTheList }
