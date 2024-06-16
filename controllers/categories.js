const Category = require("../models/category")
const Place = require("../models/place")

//This function will return all the categories.
const index = async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
  //http://localhost:3001/categories
}

//This function will show all the places in a particular category
const show = async (req, res) => {
  const categoryId = req.params.id
  const place = await Category.findById(categoryId).populate("place")
  console.log(place)

  res.send(place)
  //http://localhost:3001/categories/:categoryId/places/
}

module.exports = {
  index,
  show,
}
