require("dotenv").config()
require("./config/database")

const Place = require("./models/place")
const Category = require("./models/category")
const Review = require("./models/review")

const createCategories = async () => {
  try {
    const review = await Review.create([
      {
        reviewContent: "nice",
        reviewRating: 3,
        user: "6669861eefdcb09ab5eb3e27",
      },
    ])
    const places = await Place.create([
      {
        placeName: "Pool#1",
        placePoster:
          "https://www.99acres.com/microsite/articles/files/2023/10/swimming_pool_for_home_outdoor-e252fc5c-33fd-4e17-95fe-88a476f4a6ae.jpg",
        placePrice: 120,
        placeDescription:
          "Dive into luxury and relaxation at our premier swimming pool. Featuring crystal-clear waters, comfortable lounging areas, and stunning views, our pool offers the perfect escape. Whether you're looking to swim laps, bask in the sun, or enjoy a refreshing dip, our state-of-the-art facility caters to all your aquatic desires.",
        placeType: "swimmingPool",
        placeDates: ["day1", "day2", "day3"],
        placeTimes: ["time1", "time2", "time3"],
        placeLocation: "https://maps.app.goo.gl/FshxGsupBTff93r59",
        review: review,
      },
      {
        placeName: "Bowling#1",
        placePoster:
          "https://img.freepik.com/free-vector/bowling-icon-isolated-red-ball_134830-687.jpg",
        placePrice: 2.5,
        placeDescription:
          "Get ready to strike up some fun at our modern bowling alley! With sleek lanes, vibrant lighting, and state-of-the-art scoring systems, it's the perfect venue for both casual games and competitive tournaments. Enjoy a range of delicious snacks and beverages from our on-site cafe while you play. Whether you're a seasoned pro or a first-time bowler, our friendly atmosphere guarantees a fantastic time for everyone",
        placeType: "Bowling",
        placeDates: ["day1", "day2", "day3"],
        placeTimes: ["time1", "time2", "time3"],
        placeLocation: "https://maps.app.goo.gl/WDz1hpa2Mu3FY4uh8",
        review: review,
      },
      {
        placeName: "Bowling#2",
        placePoster:
          "https://ca-times.brightspotcdn.com/dims4/default/d4248e0/2147483647/strip/true/crop/7510x4535+0+0/resize/2000x1208!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F67%2Fdd%2Fca48944f4fa7bf1c3910ca9d7982%2F1362404-sp-1027-string-bowling4-wjs.jpg",
        placePrice: 20,
        placeDescription:
          "Roll into excitement at our premier bowling center, where fun and competition come together! Featuring impeccably maintained lanes, dynamic lighting, and the latest in scoring technology, our alley is designed for players of all skill levels. Unwind between games at our stylish lounge, offering a selection of mouthwatering snacks and refreshing drinks. Perfect for family outings, parties, or just a night out with friends, our bowling alley promises an unforgettable experience",
        placeType: "Bowling",
        placeDates: ["day1", "day2", "day3"],
        placeTimes: ["time1", "time2", "time3"],
        placeLocation: "https://maps.app.goo.gl/WDz1hpa2Mu3FY4uh8",
        review: review,
      },
    ])

    const swimmingPoolPlaces = places
      .filter((place) => place.placeType === "swimmingPool")
      .map((place) => place._id)

    const bowlingPlaces = places
      .filter((place) => place.placeType === "Bowling")
      .map((place) => place._id)

    const swimmingPool = await Category.create({
      categoryName: "swimmingPool",
      categoryPoster:
        "https://www.disabatinoinc.com/wp-content/uploads/2022/04/photo-3-scaled.jpg",
      place: swimmingPoolPlaces,
    })

    const bowling = await Category.create({
      categoryName: "Bowling",
      categoryPoster:
        "https://play-lh.googleusercontent.com/TqTXiDg5AYsWwK0_2aRwM-ijKhvlBdf2b4wYHvyQZSBLMUwSA4k1Xk3FjzMWm7jm_jM",
      place: bowlingPlaces,
    })

    console.log(`done ${swimmingPool} ${bowling}`)
  } catch (err) {
    console.error(err)
  }
}

createCategories()
