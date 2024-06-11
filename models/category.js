const mongoose = require("mongoose")
const Schema = mongoose.Schema
const categorySchema = new Schema(
  {
    categoryName: String,
    categoryPoster: String,
    place: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Category", categorySchema)
