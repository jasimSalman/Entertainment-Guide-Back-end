require('dotenv').config()
require('./db/index')

const catagory = require('./models/user')

const categories = async () => {
  try {
    const doc = await catagory.create({
      userFirstName: 'jasim',
      userLastName: 'salman',
      userName: 'jassim',
      userPasswordDigest: '12345',
      userEmail: 'jassim@gmail.com',
      userType: 'user',
      userList: ['66688bbaf0f33578b541e3fc']
      // booking: { type: Schema.Types.ObjectId, ref: 'Booking' }
    })
    console.log('Done creating category', doc)
  } catch (e) {
    console.error(e)
  }
}

categories()
