require("dotenv").config()
require("./config/database")
const Place = require("./models/user")
const Booking = require("./models/booking")
const createCategories = async () => {
  try {
    // const booking = await Booking.create({
    //   places: [""],
    // })
    const places = await Place.create({
      userFirstName: "jasim",
      userLastName: "mahemd",
      userName: "jassim",
      userPasswordDigest: "1234",
      userEmail: "jasim@gmail.com",
      userType: "user",
      booking: [],
      userList: [],
    })
  } catch (err) {
    console.error(err)
  }
}
createCategories()
