const Place = require('../models/place')
const Category = require('../models/category')
const Review = require('../models/review')
const User = require('../models/user')
const Booking = require('../models/booking')

//This function will show the details of a particular place.
const show = async (req, res) => {
  const placeId = req.params.placeId
  const places = await Place.findById(placeId)
  res.send(places)
}

// //This function will return all the reviews of a particular place.
const showReview = async (req, res) => {
  try {
    const placeId = req.params.placeId

    const place = await Place.findById(placeId).populate({
      path: 'review',
      populate: {
        path: 'user',
        select: 'username'
      }
    })
    if (!place) {
      return res.status(404).send({ error: 'Place not found' })
    }

    res.send(place.review)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while fetching reviews.' })
  }
}

//This function adds a review for a particular place.
const addReview = async (req, res) => {
  const { review: reviewText, reviewRating } = req.body
  const userId = req.params.userId
  const placeId = req.params.placeId

  try {
    const review = new Review({
      review: reviewText,
      reviewRating,
      user: userId
    })
    const createdReview = await review.save()

    const place = await Place.findById(placeId)
    if (!place) {
      return res.status(404).send({ message: 'Place not found' })
    }
    place.review.push(createdReview._id)
    await place.save()

    res.status(201).send(createdReview)
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal Server Error' })
  }
}

//This function is responsible for deleting a review from a particular place.
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId
  const review = await Review.findById(reviewId)
  if (!review) {
    return res.status(404).send('Review not found')
  }
  const deleted = await Review.findByIdAndDelete(reviewId)
  res.status(201).send(deleted)
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
      category,
      offDays,
      workingTimeStart,
      workingTimeEnd
    } = req.body

    const createdPlace = await Place.create({
      placeName,
      placePoster,
      placePrice,
      placeDescription,
      placeLocation,
      owner: userId,
      offDays,
      workingHours: {
        start: workingTimeStart,
        end: workingTimeEnd
      }
    })

    const user = await User.findById(userId)
    const selectedCategory = await Category.findOne({ categoryName: category })
    selectedCategory.place.push(createdPlace._id)
    user.place.push(createdPlace._id)
    await selectedCategory.save()
    await user.save()

    await createdPlace.save()
    res.status(200).send(createdPlace)
  } catch (e) {
    console.error(e)
  }
}

const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.placeId, req.body, {
      new: true,
      runValidators: true
    })

    if (!place) {
      return res.status(404).send({ error: 'Place not found' })
    }
    res.status(200).send(place)
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

const deletePlace = async (req, res) => {
  const placeId = req.params.placeId
  const userId = req.params.userId

  try {
    // Remove the place from the category
    const category = await Category.findOne({ place: placeId })
    if (category) {
      const categoryPlaceIndex = category.place.indexOf(placeId)
      if (categoryPlaceIndex > -1) {
        category.place.splice(categoryPlaceIndex, 1)
        await category.save()
      }
    }

    // Remove the place from the bookings and from the user's bookings
    const bookings = await Booking.find({ place: placeId })
    for (const booking of bookings) {
      const user = await User.findById(booking.user)
      if (user) {
        const userBookingIndex = user.booking.indexOf(booking._id)
        if (userBookingIndex > -1) {
          user.booking.splice(userBookingIndex, 1)
          await user.save()
          await booking.deleteOne()
        }
      }
    }

    // Remove the place from the user
    const user = await User.findById(userId)
    if (user) {
      const userPlaceIndex = user.place.indexOf(placeId)
      if (userPlaceIndex > -1) {
        user.place.splice(userPlaceIndex, 1)
        await user.save()
      }
    }

    // Remove the place itself
    const place = await Place.findById(placeId)
    if (place) {
      await Place.findByIdAndDelete(placeId)
    }

    res.status(200).send({ message: 'Place deleted successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

const addedPlaces = async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findById(userId).populate('place')
    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }

    res.status(200).send(user.place)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

const search = async (req, res) => {
  const { placeName } = req.body

  try {
    const result = await Place.find({
      placeName: { $regex: new RegExp(placeName, 'i') }
    })

    res.send(result)
  } catch (error) {
    console.log('Error:', error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  show,
  addReview,
  showReview,
  deleteReview,
  addPlace,
  updatePlace,
  deletePlace,
  addedPlaces,
  search
}
