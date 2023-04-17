const { Router } = require('express')

const { getAllDemoInvoices, getSingleInvoice } = require('../controllers/demo')

const demoInvoicesRouter = Router()

demoInvoicesRouter.route('/invoices').get(getAllDemoInvoices)

demoInvoicesRouter.route('/invoices/:id').get(getSingleInvoice)

module.exports = { demoInvoicesRouter }
