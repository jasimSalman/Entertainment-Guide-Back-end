const Place = require('../models/place')
const Category = require('../models/category')
const Review = require('../models/review')
// const place = require('../models/place')

//This function will return all the places of a certain category.
const index = async (req, res) => {
  // const paramId = req.params.id
  // const categories = await Category.findById(paramId)
  const categories = await Category.findById()
  // const places = await Place.find({ placeType: categories.categoryName })
  const places = await Place.find()
  res.send(places)
  //http://localhost:3001/places
}

//This function will show the details of a particular place.
const show = async (req, res) => {
  const placeId = req.params.placeId
  console.log(placeId)
  const places = await Place.findById(placeId)
  console.log(places)
  res.send(places)
}

//This function will return all the reviews of a particular place.
const showReview = async (req, res) => {
  const placeId = req.params.placeId
  const places = await Place.findById(placeId)

  const reviews = places.review
  const review = await Review.findById(reviews)

  res.send(review)
}

//This function adds a review for a particular place.
const addReview = async (req, res) => {
  const reqBody = req.body
  const placeId = req.params.placeId
  console.log(`Request body == > ${JSON.stringify(reqBody)}`)
  console.log(`Place ID == > ${JSON.stringify(placeId)}`)

  try {
    const review = new Review(reqBody)
    const createdRe = await review.save()
    console.log(createdRe._id)

    const place = await Place.findById(placeId)
    place.review.push(createdRe._id)
    await place.save()
    res.status(201).send(createdRe)
  } catch (e) {
    console.error(e)
  }
}

//This function is responsible for deleting a review from a particular place.
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId
  console.log(`Review ID ==>${reviewId}`)

  const review = await Review.findById(reviewId)

  if (!review) {
    return res.status(404).send('Review not found')
  }

  const deleted = await Review.findByIdAndDelete(reviewId)

  res.status(201).send(deleted)
}

module.exports = {
  index,
  show,
  showReview,
  addReview,
  deleteReview
}
