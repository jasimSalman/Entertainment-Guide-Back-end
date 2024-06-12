const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bookingSchema = new Schema(
  {
    place: { type: Schema.Types.ObjectId, ref: "Place", required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Booking", bookingSchema)
