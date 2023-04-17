const mockdata = require('../mock/data.json')

const getAllDemoInvoices = async (_, res) => {
  res.json({ status: 'success', count: mockdata.length, data: mockdata })
}

const getSingleInvoice = async (req, res) => {
  const { id } = req.params
  const invoice = mockdata.filter((invoice) => invoice.id == id)

  if (!invoice) {
    return res.status(404).json({ status: 'fail', message: `no invoices mathced with id ${id}` })
  }

  res.json({ status: 'success', data: invoice })
}

module.exports = { getAllDemoInvoices, getSingleInvoice }
