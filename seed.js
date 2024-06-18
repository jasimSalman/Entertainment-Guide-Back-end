require('dotenv').config()
require('./config/database')

const Place = require('./models/place')
const Category = require('./models/category')
const Review = require('./models/review')

const createCategories = async () => {
  try {
    await Category.create({
      categoryName: 'Amusement Parks',
      categoryPoster:
        'https://t3.ftcdn.net/jpg/06/34/93/50/360_F_634935028_Y5sy10kpKnbMPRD0huZi1tDodoKqsWWY.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Cinemas and Theaters',
      categoryPoster:
        'https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2151067056.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Concert Halls and Music Venues',
      categoryPoster:
        'https://afar.brightspotcdn.com/dims4/default/76f282f/2147483647/strip/true/crop/3000x1500+0+418/resize/1440x720!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F0f%2Ff3%2F78726f3d536cce572b6c3c195fc8%2Foriginal-massachusetts.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Museums and Art Galleries',
      categoryPoster:
        'https://t3.ftcdn.net/jpg/06/08/30/46/360_F_608304605_XtA3ZsapU7trdIOyUeTCgH4Snh3AX0aS.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Sports Arenas and Stadiums',
      categoryPoster:
        'https://www.shutterstock.com/image-photo/soccer-stadium-field-background-600nw-2212159303.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Bowling Alleys and Arcades',
      categoryPoster:
        'https://t4.ftcdn.net/jpg/08/42/17/95/360_F_842179504_VLjMfoH1Rz7DJZiulXENstxCK2TYIBmE.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Zoos and Aquariums',
      categoryPoster:
        'https://c1.wallpaperflare.com/preview/653/855/808/aquarium-photos-hungary-marine.jpg',
      place: []
    })

    await Category.create({
      categoryName: 'Escape Rooms and Interactive Experiences',
      categoryPoster:
        'https://cdn.prod.website-files.com/634d73016da598049a82ddab/653a057ffe9dfc29b0a47ba0_DreamShaper_v7_Delve_into_the_immersive_world_of_escape_rooms_0.jpg',
      place: []
    })
  } catch (err) {
    console.error(err)
  }
}

createCategories()
