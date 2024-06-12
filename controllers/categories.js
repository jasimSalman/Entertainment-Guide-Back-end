const Category = require('../models/category')

//This function will return all the categories.
async function index(req, res) {
  const categories = await Category.find({})
  res.json(categories)
  //http://localhost:3001/categories
}

module.exports = {
  index
}
