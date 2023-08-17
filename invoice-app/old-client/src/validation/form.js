import * as Yup from 'yup';

export default Yup.object().shape({
  senderAddress: Yup.object().shape({
    street: Yup.string().required("can't be empty"),
    city: Yup.string().required("can't be empty"),
    postCode: Yup.string().required("can't be empty"),
    country: Yup.string().required("can't be empty")
  }),
  clientName: Yup.string().required("can't be empty"),
  clientEmail: Yup.string().email().required("can't be empty"),
  clientAddress: Yup.object().shape({
    street: Yup.string().required("can't be empty"),
    city: Yup.string().required("can't be empty"),
    postCode: Yup.string().required("can't be empty"),
    country: Yup.string().required("can't be empty")
  }),
  paymentTerms: Yup.string().required("can't be empty"),
  description: Yup.string().required("can't be empty"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("can't be empty"),
        quantity: Yup.number().required("can't be empty"),
        price: Yup.number().required("can't be empty")
      })
    )
    .required('must have at least one item')
    .min(1)
});
