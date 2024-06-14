const User = require('../models/user')
const Place = require('../models/place')

//This function will show all the places in the user's favorite list.
const index = async (req, res) => {
  // console.log(`The request == >${req}`)
  const userId = req.params.userId
  // console.log(`User id ==> ${userId}`)
  const user = await User.findById(userId)
  // console.log(`User from the DB == >${user}`)
  const lists = user.userList
  const places = await Place.find({ _id: { $in: lists } })
  res.send(places)
}

//This function is responsible for adding new places to the favorite list.
const add = async (req, res) => {
  try {
    const placeId = req.params.placeId
    console.log(`The place ID =>${placeId}`)
    const userId = '6669861eefdcb09ab5eb3e27' //remove it later.

    const user = await User.findById(userId)
    // console.log(`User id from the request  ${user}`)
    user.userList.push(placeId)
    await user.save()
    // res.send('Saves succefully ')
  } catch (e) {
    console.error(e)
  }
}

const deleteFromTheList = async (req, res) => {
  // const userId = req.params.id
  const userId = '6669e49d01eed5b23c45afe1'
  const user = await User.findById(userId)
  const placeId = req.body.placeId
  const index = user.userList.indexOf(placeId)
  user.userList.splice(index, 1)
  await user.save()
  res.send(`Delete succefully`)
  //http://localhost:3001/list/delete/666986d29ec4234646f4e9ad
}

module.exports = { index, add, delete: deleteFromTheList }
