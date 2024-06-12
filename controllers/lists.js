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
    const palceId = req.params.palceId

    const userId = '66689455cedf867f427f7325' //remove it later.
    const user = await User.findById(userId)
    // console.log(`User id from the request  ${user}`)
    user.userList.push(palceId)
    await user.save()
    // res.send('Saves succefully ')
  } catch (e) {
    console.error(e)
  }
}

module.exports = { index, add }
