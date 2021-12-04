require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 2618
const userRoutes = require('./routes/userRoutes')
const db_url = process.env.DB_URL

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', userRoutes)

async function dbConnect() {
    await mongoose.connect(db_url)
}
dbConnect()

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
})