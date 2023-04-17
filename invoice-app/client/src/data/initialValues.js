const initialValues = {
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  clientName: '',
  clientEmail: '',
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  createdAt: '',
  paymentTerms: '',
  description: '',
  status: 'draft',
  items: [
    {
      name: '',
      quantity: '',
      price: '',
      total: 0
    }
  ]
};

export default initialValues;
