const Place = require("../models/place")
const Category = require("../models/category")
const Review = require("../models/review")

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

//this function to add a review for a particular place.
const addReview = async (req, res) => {
  const placeId = req.body
  console.log(placeId)
  try {
    const review = new Review(placeId)
    const createdRe = await review.save()
    console.log(createdRe)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  show,
  showReview,
  addReview,
}
