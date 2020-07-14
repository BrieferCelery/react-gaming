const express = require("express")
const cors = require("cors")
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require("passport-google").Strategy
const keys = require("../config")
const chalk = require("chalk")
const { Strategy } = require("passport")
let user = {}

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})

const app = express()
app.use(cors())
app.use(passport.initialize())

//Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackUrl: "/auth/facebook/callback"
},

    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.bluue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }))

app.get("/auth/facebook", passport.authenticate("facebook"))
app.get("/auth/facebook/callback",
    passport.authenticate(("facebook"),
        (req, res) => {
            res.redirect("/profile")
        }))

//Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackUrl: "/auth/google/callback"
},

    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.bluue(JSON.stringify(profile)))
        user = { ...profile }
        return cb(null, profile)
    }))

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))
app.get("/auth/google/callback",
    passport.authenticate(("google"),
        (req, res) => {
            res.redirect("/profile")
        }))

app.get("/user", (req, res) => {
    console.log("getting user data!")
    res.send(user)
})

app.get("/auth/logout", (req, res) => {
    console.log("logging out!")
    user = {}
    res.redirect("/")
})

const PORT = 5000
app.listen(PORT)