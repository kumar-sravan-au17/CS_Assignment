const { Router } = require('express')
const surveyRoutes = Router()
const survey_model = require('../models/Survey')
const userVerify = require('../utils/userVerify')
const adminVerify = require('../utils/adminVerify')
const response_model = require('../models/Responses')


surveyRoutes.post('/', adminVerify ,async (req, res) => {
    console.log(req.user);
    // Add to database
    try {
        const data = req.body
        const inserted = await survey_model.create(data)
        res.send(inserted)
    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }
})

surveyRoutes.post('/responses', userVerify , async (req, res) => {
    console.log(req.body);
    // Add to database
    try {
        const data = req.body
        const inserted = await response_model.create(data)
        res.send(inserted)
    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }
})

surveyRoutes.get('/responses/:id', userVerify , async (req, res) => {
    try {
        const data = await response_model.find({questionId: req.params.id})
        res.send(data)
    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }
})

surveyRoutes.get('/', userVerify, async (req, res) => {
    try {
        const data = await survey_model.find()
        res.send(data)
    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }
})

surveyRoutes.get('/:id', userVerify, async (req, res) => {
    try {
        const data = await survey_model.find({_id: req.params.id})
        res.send(data)
    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }
})

module.exports = surveyRoutes