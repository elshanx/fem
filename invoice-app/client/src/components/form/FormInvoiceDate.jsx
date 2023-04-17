import { Field } from 'formik';
import FormLabel from './FormLabel';

const FormInvoiceDate = ({ handleBlur }) => {
  return (
    <Field
      handleBlur={handleBlur}
      as={FormLabel}
      half
      name='createdAt'
      type='date'
      text='Invoice Date'
      date
    />
  );
};

export default FormInvoiceDate;
