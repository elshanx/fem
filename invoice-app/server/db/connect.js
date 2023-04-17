require('dotenv').config()
const { connect } = require('mongoose')

const DB = process.env.MONGO_DB_URI

const connectDB = (URI = DB) => connect(URI)

module.exports = { connectDB }
