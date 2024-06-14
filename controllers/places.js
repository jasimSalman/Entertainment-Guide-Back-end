const Place = require('../models/place')
const Category = require('../models/category')
const Review = require('../models/review')
const User = require('../models/user')

//This function will show the details of a particular place.
const show = async (req, res) => {
  const placeId = req.params.placeId
  const places = await Place.findById(placeId)
  res.send(places)
  //http://localhost:3001/places/:placeId
}

//This function will return all the reviews of a particular place.
const showReview = async (req, res) => {
  const placeId = req.params.placeId
  const places = await Place.findById(placeId)
  const reviews = places.review
  const review = await Review.findById(reviews)
  res.send(review)
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
  const reviewId = req.params.reviewId
  const review = await Review.findById(reviewId)

  if (!review) {
    return res.status(404).send('Review not found')
  }

  const deleted = await Review.findByIdAndDelete(reviewId)

  res.status(201).send(deleted)
  //http://localhost:3001/places/placeId/reviews/reviewId
}

//This function adds a a place in a particular category.
const addPlace = async (req, res) => {
  const {
    placeName,
    placePoster,
    placePrice,
    placeDescription,
    placeType,
    placeLocation
  } = req.body
  const userId = req.params.userId //The id of the owner

  try {
    //Create the new place.
    const place = new Place({
      placeName,
      placePoster,
      placePrice,
      placeDescription,
      placeType,
      placeLocation
    })
    const createdPlace = await place.save()

    //Assign the new place to the owner.
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }
    user.place.push(createdPlace._id)
    await user.save()

    //Assign the place to the right caetgory.
    const category = await Category.findOne({ categoryName: placeType })
    if (!category) {
      return res.status(404).send({ error: 'Category not found' })
    }
    category.place.push(createdPlace._id)
    await category.save()

    res.status(201).send(createdPlace)
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Internal Server Error' })
  }
  //https://localhost:3001/places/new/userId
}

//This function is responsible for updating the information of a particular place.
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
  //https://localhost:3001/places/placeId
}

//This function is responsible for delete a place
const deletePlace = async (req, res) => {
  const placeId = req.params.placeId
  const userId = req.params.userId

  try {
    const place = await Place.findById(placeId)
    if (!place) {
      return res.status(404).send({ error: 'Place not found' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }

    const placeIndex = user.place.indexOf(placeId)
    if (placeIndex > -1) {
      user.place.splice(placeIndex, 1)
    } else {
      return res.status(404).send({ error: 'Place not found in user places' })
    }

    await user.save()

    await Place.findByIdAndDelete(placeId)

    res.status(200).send({ message: 'Place deleted successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Internal Server Error' })
  }
  //https://localhost:3001/places/placeId/userId
}

module.exports = {
  show,
  addReview,
  showReview,
  deleteReview,
  addPlace,
  updatePlace,
  deletePlace
}
