const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001
const db = require('./config/database')

// const usersRouter = require("./routes/users")
// const bookingsRouter = require("./routes/bookings")
const listsRouter = require('./routes/lists')
const categoriesRouter = require('./routes/categories')
const placesRouter = require('./routes/places')
// const adminsRouter = require("./routes/admin")

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use("/users", usersRouter)
app.use('/places', placesRouter)
// app.use("/book", bookingsRouter)
app.use('/list', listsRouter)
// app.use("/admin", adminsRouter)
app.use('/categories', categoriesRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
