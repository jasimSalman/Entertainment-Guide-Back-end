const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Placeschema = new Schema(
  {
    placeName: String,
    placePoster: String,
    placePrice: Number,
    placeDescription: String,
    placeLocation: String,
    offDays: [
      {
        type: String,
        enum: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        required: true
      }
    ],
    workingHours: {
      start: { type: String, required: true },
      end: { type: String, required: true }
    },
    booking: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Place', Placeschema)
