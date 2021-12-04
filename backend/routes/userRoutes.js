const { Router } = require('express')
const user_model = require('../models/User')
const userRoutes = Router()

userRoutes.post('/login', (req, res) => {
    console.log(req.body);
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