const Place = require("../models/place")
const Category = require("../models/category")
const Review = require("../models/review")
const User = require("../models/user")
const Booking = require("../models/booking")

//This function will show the details of a particular place.
const show = async (req, res) => {
  const placeId = req.params.placeId
  const places = await Place.findById(placeId)
  res.send(places)
  //http://localhost:3001/places/:placeId
}

// //This function will return all the reviews of a particular place.
const showReview = async (req, res) => {
  try {
    const placeId = req.params.placeId
    const place = await Place.findById(placeId).populate("review")
    res.send(place.review)
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching reviews." })
  }
  //http://localhost:3001/places/:placeId/reviews
}

//This function adds a review for a particular place.
const addReview = async (req, res) => {
  const reqBody = req.body
  const placeId = req.params.placeId
  try {
    const review = new Review(reqBody)
    const createdReview = await review.save()

    const place = await Place.findById(placeId)
    place.review.push(createdReview._id)
    await place.save()
    res.status(201).send(createdReview)
  } catch (e) {
    console.error(e)
  }
  //http://localhost:3001/places/placeId/reviews/userId
}

//This function is responsible for deleting a review from a particular place.
const deleteReview = async (req, res) => {
  const review = await Review.findById(reviewId)
  if (!review) {
    return res.status(404).send("Review not found")
  }
  const deleted = await Review.findByIdAndDelete(reviewId)
  res.status(201).send(deleted)
  //http://localhost:3001/places/placeId/reviews/reviewId
}

//This function adds a review for a particular place.
const addPlace = async (req, res) => {
  const userId = req.params.userId
  try {
    const {
      placeName,
      placePoster,
      placePrice,
      placeDescription,
      placeLocation,
    } = req.body

    const createdPlace = await Place.create(
      placeName,
      placePoster,
      placePrice,
      placeDescription,
      placeLocation
    )
    const user = await User.findById(userId)
    user.place.push(createdPlace._id)
    await user.save()
    res.status(200).send(createdPlace)
  } catch (e) {
    console.error(e)
  }
  //https://localhost:3001/places/new/userId
}

const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.placeId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!place) {
      return res.status(404).send({ error: "Place not found" })
    }
    res.status(200).send(place)
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: "Internal Server Error" })
  }
  //https://localhost:3001/places/placeId
}

const deletePlace = async (req, res) => {
  const placeId = req.params.placeId
  const userId = req.params.userId

  try {
    const place = await Place.findById(placeId)
    if (!place) {
      return res.status(404).send({ error: "Place not found" })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }

    const placeIndex = user.place.indexOf(placeId)
    if (placeIndex > -1) {
      user.place.splice(placeIndex, 1)
    } else {
      return res.status(404).send({ error: "Place not found in user places" })
    }

    await user.save()

    const category = await Category.findById(placeId)
    if (!category) {
      return res.status(404).send({ error: "Category not found" })
    }

    const categoryPlaceIndex = category.place.indexOf(placeId)
    if (categoryPlaceIndex > -1) {
      category.place.splice(placeIndex, 1)
    } else {
      return res
        .status(404)
        .send({ error: "Place not found in category places" })
    }

    const booking = await Booking.findById(placeId)
    if (!booking) {
      return res.status(404).send({ error: "Booking not found" })
    }
    const bookingPlaceIndex = booking.place.indexOf(placeId)
    if (bookingPlaceIndex > -1) {
      booking.place.splice(placeIndex, 1)
    } else {
      return res
        .status(404)
        .send({ error: "Place not found in booking places" })
    }

    await Place.findByIdAndDelete(placeId)

    res.status(200).send({ message: "Place deleted successfully" })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: "Internal Server Error" })
  }
  //http://localhost:3001/places/placeId/userId
}

const addedPlaces = async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId).populate("place")
    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }

    res.status(200).send(user.place)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "Internal Server Error" })
  }
} //http://localhost:3001/places/all/:userId

module.exports = {
  show,
  addReview,
  showReview,
  deleteReview,
  addPlace,
  updatePlace,
  deletePlace,
  addedPlaces,
}
