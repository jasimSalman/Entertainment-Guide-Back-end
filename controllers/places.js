const Place = require('../models/place')
const Category = require('../models/category')
const Review = require('../models/review')

const index = async (req, res) => {
  // const paramId = req.params.id
  // const categories = await Category.findById(paramId)
  const categories = await Category.findById()
  // const places = await Place.find({ placeType: categories.categoryName })
  const places = await Place.find()
  res.send(places)
  //http://localhost:3001/places
}

const show = async (req, res) => {
  const placeId = req.params.placeId
  console.log(placeId)
  const places = await Place.findById(placeId)
  console.log(places)
  res.send(places)
}

const showReview = async (req, res) => {
  const placeId = req.params.placeId
  const places = await Place.findById(placeId)

  const reviews = places.review
  const review = await Review.findById(reviews)

  res.send(review)
}

module.exports = {
  index,
  show,
  showReview
}
