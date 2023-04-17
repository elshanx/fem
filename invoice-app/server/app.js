require('express-async-errors')
const express = require('express')
const { connectDB } = require('./db/connect')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const { demoInvoicesRouter } = require('./routes/demo')
const { invoicesRouter } = require('./routes/invoices')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({ windowMs: 60 * 1000, max: 150 }))

app.use('/api/v1/demo/', demoInvoicesRouter)
app.use('/api/v1/invoices', invoicesRouter)

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

const PORT = process.env.PORT || 5000

!(async function () {
  try {
    await connectDB()
    console.log('connected to DATABASE')
    app.listen(PORT, () => {
      console.log(`server is listening on PORT:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
})()
