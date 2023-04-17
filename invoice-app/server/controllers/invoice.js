const Invoice = require('../models/invoice')

const getAllInvoices = async (_, res) => {
  const invoices = await Invoice.find({})

  res.json({ status: 'success', count: invoices.length, data: invoices })
}

const getSingleInvoice = async (req, res) => {
  const { id } = req.params
  const invoice = await Invoice.findOne({ id })

  if (!invoice) {
    return res.status(404).json({ status: 'fail', message: `no invoices matched with id ${id}` })
  }

  res.json({ status: 'success', data: invoice })
}

const createInvoice = async (req, res) => {
  const { id } = req.body
  const invoiceWithSameIdExists = await Invoice.findOne({ id })

  if (invoiceWithSameIdExists) {
    return res
      .status(404)
      .json({ status: 'fail', message: `there is an invoice with the id ${id}` })
  }

  const invoice = Invoice.create(req.body)
  res.status(201).json({ status: 'success', invoice })
}

const deleteInvoice = async (req, res) => {
  const { id } = req.params
  const invoice = await Invoice.findOne({ id })

  if (!invoice) {
    return res.status(404).json({ status: 'fail', message: `no invoices matched with id ${id}` })
  }

  await invoice.remove()

  res.status(200).json({ status: 'success' })
}

const updateInvoiceStatus = async (req, res) => {
  const { id } = req.params
  const status = req.body.status

  const invoice = await Invoice.findOneAndUpdate(
    { id },
    { $set: { status: status } },
    { upsert: false, new: true },
  )

  if (!invoice) {
    res.status(404).json({ status: 'fail', message: `no invoices matched with id ${id}` })
  }

  res.status(200).json({ status: 'success', invoice })
}

module.exports = {
  getAllInvoices,
  getSingleInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoiceStatus,
}
