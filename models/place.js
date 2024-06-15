const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Placeschema = new Schema(
  {
    placeName: String,
    placePoster: String,
    placePrice: Number,
    placeDescription: String,
    placeLocation: String,
    booking: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Place', Placeschema)
