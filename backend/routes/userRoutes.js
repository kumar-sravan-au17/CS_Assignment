const { Router } = require('express')
const user_model = require('../models/User')
const userRoutes = Router()
const jwt = require('jsonwebtoken')

userRoutes.post('/login', async (req, res) => {
    // Checking if email signed up before
    const user = await user_model.findOne({email: req.body.email})
    if (!user){
        return res.status(400).send('This Email is not signed up')
    }

    // Check if user password matches
    if (req.body.password !== user.password) {
        return res.status(401).send('Invalid Password')
    }

    // Assign a JWT Token
    const token = jwt.sign({id: user._id, role: user.role}, process.env.TOKEN_SECRET)
    res.cookie('auth-token', token)
    return res.json({
        error: false,
        message: "User Logged In",
        token: token,
        role: user.role,
        userId: user._id,
        userName: user.name
    })
})

userRoutes.post('/signup', async (req, res) => {

    // Check if user already exists
    const emailExist = await user_model.findOne({email: req.body.email})
    if (emailExist){
        return res.status(400).send('Email already exists')
    }

    // If user is new, add to database
    try {
        const data = req.body
        const inserted = await user_model.create(data)
        res.send(inserted)
    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }
})
module.exports = userRoutes