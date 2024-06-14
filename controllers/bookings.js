const Booking = require('../models/booking')
const Place = require('../models/place')
const User = require('../models/user')

//This function is for creating a new booking.
const create = async (req, res) => {
  try {
    const book = await Booking.create(req.body)
    const user = await User.findById(req.body.user)
    user.booking.push(book)
    await user.save()

    const place = await Place.findById(req.body.place)
    place.booking.push(book)
    await place.save()
    res.send(book)
  } catch (err) {
    console.log(err)
  }
  // http://localhost:3001/book/:placeId/create
}

const index = async (req, res) => {
  try {
    // userId=req.params.userId
    const userId = '666aa6d350469c291aad9e00'
    const user = await User.findById(userId).populate('booking')
    const booking = user.booking
    res.send(booking)
  } catch (err) {
    console.log(err)
  }
  //http://localhost:3001/book/6669861eefdcb09ab5eb3e27
}

module.exports = {
  create,
  index
}
