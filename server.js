const express = require("express")
const logger = require("morgan")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 3001

require("./config/database")

const usersRouter = require("./routes/AuthRouter")
const bookingsRouter = require("./routes/bookings")
const listsRouter = require("./routes/lists")
const categoriesRouter = require("./routes/categories")
const placesRouter = require("./routes/places")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/auth", usersRouter)
app.use("/places", placesRouter)
app.use("/book", bookingsRouter)
app.use("/list", listsRouter)
app.use("/categories", categoriesRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
