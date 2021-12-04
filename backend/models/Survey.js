const mongoose = require('mongoose')

const survey_schema = mongoose.Schema(
    {
        title : String,
        questions: Array,
        expiry: String
    },
    {
        timestamps: true
    }
)

const survey_model = mongoose.model("Surveys", survey_schema)

module.exports = survey_model