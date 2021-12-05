const mongoose = require('mongoose')

const response_schema = mongoose.Schema(
    {
        user : String,
        responses: Array,
        questionId: String
    },
    {
        timestamps: true
    }
)

const response_model = mongoose.model("Responses", response_schema)

module.exports = response_model