const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    email: String,
    type: String,
    booking: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    userList: [{ type: Schema.Types.ObjectId, ref: "Place" }],
    place: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", UserSchema)
