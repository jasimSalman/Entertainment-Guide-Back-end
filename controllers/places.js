const Place = require("../models/place")
const Category = require("../models/category")

async function index(req, res) {
  // const paramId = req.params.id
  // const categories = await Category.findById(paramId)
  const categories = await Category.findById()
  // const places = await Place.find({ placeType: categories.categoryName })
  const places = await Place.find()
  res.json(places)
  //http://localhost:3001/places
}

module.exports = {
  index,
}
