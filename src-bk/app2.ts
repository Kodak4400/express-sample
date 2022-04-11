import express, { Router } from 'express'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import path from 'path'

const app = express()
const port = 3000

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

app.use(passport.initialize())

// セッションの設定
app.use(
  session({
    secret: 'secret word',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000,
    },
  }),
)

// Passportとセッション管理を連携
app.use(passport.session())

// セッションにユーザーIDを格納
passport.serializeUser(function (user, done) {
  done(null, user.username)
})
// 認証後セッションのユーザーIDからユーザー情報を取得する
passport.deserializeUser(function (username, done) {
  done(err, username)
})

router.get('/', (req, res) => {
  res.sendFile(path.resolve('src/views/index.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('src/views/login.html'))
})

router.post(
  '/login',
  (req, res, done) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login', // Error
      // failureFlash: true,
      session: false,
    })
  },
  (req, res) => {
    console.log(req)
    res.send('Success')
  },
)

app.use(router)

app.listen(port, () => {
  console.log(`Node js is listening to PORT: ${port}`)
})
