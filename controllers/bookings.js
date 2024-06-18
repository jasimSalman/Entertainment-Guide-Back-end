const Booking = require("../models/booking")
const Place = require("../models/place")
const User = require("../models/user")

//This function will show all the bookings of a user.
const index = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId).populate({
      path: "booking",
      populate: {
        path: "place",
        model: "Place",
      },
    })

    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }
    res.send(user.booking)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: "Internal server error" })
  }
  //http://localhost:3001/book/userId
}

//This function is for creating a new booking.
const create = async (req, res) => {
  try {
    const { start, end } = req.body
    const placeId = req.params.placeId
    const userId = req.params.userId

    const book = await Booking.create({
      place: placeId,
      start,
      end,
      user: userId,
    })

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }
    user.booking.push(book._id)
    await user.save()

    const place = await Place.findById(placeId)
    if (!place) {
      return res.status(404).send({ error: "Place not found" })
    }
    place.booking.push(book._id)
    await place.save()

    res.status(201).send(book)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: "Internal Server Error" })
  }
  //http://localhost:3001/book/:placeId/create/:userId
}

//This function will show all the bookings for the owner.
const ownerBooking = async (req, res) => {
  try {
    const ownerId = req.params.userId

    const owner = await User.findById(ownerId).populate("place")
    if (!owner) {
      return res.status(404).send({ error: "Owner not found" })
    }

    // Find all bookings for the places the owner has
    const placesWithBookings = await Place.find({
      _id: { $in: owner.place },
    }).populate({
      path: "booking",
      populate: {
        path: "place", // Ensure place is also populated in the booking
        model: "Place",
      },
    })

    // Extract all bookings from the places
    const bookings = placesWithBookings.reduce((acc, place) => {
      return acc.concat(place.booking)
    }, [])
    res.send(bookings)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: "Internal Server Error" })
  }
  //http://localhost:3001/book/all/userId
}

module.exports = {
  create,
  index,
  ownerBooking,
}
