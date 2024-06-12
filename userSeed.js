require("dotenv").config()
require("./config/database")
const Place = require("./models/user")
const Booking = require("./models/booking")
const createCategories = async () => {
  try {
    const places = await Place.create({
      userFirstName: "mohaammed",
      userLastName: "mirza",
      userName: "zainab",
      userPasswordDigest: "1234",
      userEmail: "zainab@gmail.com",
      userType: "user",
      booking: [],
      userList: ["666986d29ec4234646f4e9ad"],
    })
  } catch (err) {
    console.error(err)
  }
}
createCategories()
