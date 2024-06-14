const Category = require("../models/category")
const Place = require("../models/place")

async function index(req, res) {
  const categories = await Category.find({})
  res.json(categories)
  //http://localhost:3001/categories
}

const show = async (req, res) => {
  const categoryId = req.params.id
  const category = await Category.findById(categoryId).populate("place")
  res.send(category)
  //http://localhost:3001/:id/places/
}

module.exports = {
  index,
  show,
}
