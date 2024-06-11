const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bookingSchema = new Schema(
  {
    places: [{ type: Schema.Types.ObjectId, ref: "Place" }],
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Booking", bookingSchema)
