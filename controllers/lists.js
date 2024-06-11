const User = require('../models/user')
const Place = require('../models/place')

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

    const userId = '66689455cedf867f427f7325'

    const user = await User.findById(userId)
    console.log(`User id from the request  ${user}`)
    user.userList.push(palceId)
    await user.save()
    res.send('Saves succefully ')
  } catch (e) {
    console.error(e)
  }
}

module.exports = { index, add }
