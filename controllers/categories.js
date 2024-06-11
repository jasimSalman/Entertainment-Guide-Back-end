const Category = require("../models/category")

async function index(req, res) {
  const categories = await Category.find({})
  res.json(categories)
}

module.exports = {
  index,
}
