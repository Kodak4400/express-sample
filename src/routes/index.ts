import { Router } from 'express'
import passport from 'passport'
import passportLocal from 'passport-local'
import path from 'path'

const LocalStrategy = passportLocal.Strategy

const User = {
  name: 'admin',
  password: 'pass',
}

// 検証
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log('localstrategy')
    if (username !== User.name) {
      return done(null, false, { message: 'ユーザーIDが間違っています。' }) // Error
    } else if (password !== User.password) {
      return done(null, false, { message: 'パスワードが間違っています。' }) // Error
    } else {
      // Success and return user information.
      console.log('success')
      return done(null, { username: username, password: password })
    }
  }),
)

const router = Router()

router.use(passport.initialize())

router.get('/', (req, res) => {
  res.sendFile(path.resolve('src/views/index.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('src/views/login.html'))
})

router.post(
  '/login',
  (req, res, next) => {
    // console.log(req.body)
    next()
  },
  (req, res, {}) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login', // Error
      failureFlash: true,
      session: false,
    })
  },
  (req, res) => {
    console.log(req)
    res.send('Success')
  },
)

export default router
