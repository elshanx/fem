require('dotenv').config()

const { connectDB } = require('../db/connect')
const Invoice = require('../models/invoice')
const DATA = require('../mock/data.json')

!(async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Invoice.deleteMany()
    await Invoice.create(DATA)
    console.log('Success!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
