require('dotenv').config()
require('./config/database')

const Place = require('./models/user')
// const Category = require('./models//review')

const createCategories = async () => {
  try {
    const places = await Place.create({
      userFirstName: 'jasim',
      userLastName: 'String',
      userName: String,
      userPasswordDigest: String,
      userEmail: String,
      userType: String,
      userList: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
      booking: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
    })
  } catch (err) {
    console.error(err)
  }
}

createCategories()
