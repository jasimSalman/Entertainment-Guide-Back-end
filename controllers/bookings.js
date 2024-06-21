const Booking = require('../models/booking')
const Place = require('../models/place')
const User = require('../models/user')

//This function will show all the bookings of a user.
const index = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).populate({
      path: 'booking',
      populate: {
        path: 'place',
        model: 'Place'
      }
    })

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    res.send(user.booking)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const allBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({})
    res.status(200).json(bookings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while fetching bookings', error })
  }
}

//This function is for creating a new booking.
const create = async (req, res) => {
  try {
    const { date } = req.body

    const start = new Date(date)
    const end = new Date(start)
    end.setHours(start.getHours() + 1)

    const placeId = req.params.placeId
    const userId = req.params.userId

    const book = await Booking.create({
      place: placeId,
      start,
      end,
      user: userId
    })

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }
    user.booking.push(book._id)
    await user.save()

    const place = await Place.findById(placeId)
    if (!place) {
      return res.status(404).send({ error: 'Place not found' })
    }
    place.booking.push(book._id)
    await place.save()

    res.status(201).send(book)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

//This function will show all the bookings for the owner.
const ownerBooking = async (req, res) => {
  try {
    const ownerId = req.params.userId

    const owner = await User.findById(ownerId).populate('place')
    if (!owner) {
      return res.status(404).send({ error: 'Owner not found' })
    }

    const placesWithBookings = await Place.find({
      _id: { $in: owner.place }
    }).populate({
      path: 'booking',
      populate: {
        path: 'place',
        model: 'Place'
      }
    })

    const bookings = placesWithBookings.reduce((acc, place) => {
      return acc.concat(place.booking)
    }, [])
    res.send(bookings)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

module.exports = {
  create,
  index,
  ownerBooking,
  allBooking
}
