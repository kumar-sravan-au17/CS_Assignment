const { Router } = require('express')
const surveyRoutes = Router()
const survey_model = require('../models/Survey')

surveyRoutes.post('/', async (req, res) => {
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

surveyRoutes.get('/', async (req, res) => {
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

surveyRoutes.get('/:id', async (req, res) => {
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