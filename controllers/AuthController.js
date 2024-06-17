const User = require('../models/user')
const middleware = require('../middleware/index')

const Register = async (req, res) => {
  console.log(`Register request body: ${JSON.stringify(req.body)}`)
  try {
    const { firstName, lastName, username, email, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    console.log(`Hashed password: ${passwordDigest}`)

    let existingUser = await User.findOne({ username })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that username has already been registered!')
    } else {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        passwordDigest
      })
      console.log(`Created user: ${JSON.stringify(user)}`)
      res.send(user)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    console.log('User passwordDigest:', user.passwordDigest)

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        type: user.type
      }

      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    let user = await User.findById(req.params.user_id)

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )

    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })

      let payload = {
        id: user.id,
        email: user.email
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  // console.log(`Check sesssion response ${res.locals}`)
  // console.log(`Check sesssion payload ${payload}`)
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
