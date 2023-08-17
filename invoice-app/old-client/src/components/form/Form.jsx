import { Formik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import initialValues from '../../data/initialValues';
import {
  submitEditInvoice as submitEditInvoiceAction,
  submitNewInvoice as submitNewInvoiceAction
} from '../../redux/invoices/invoices.actions';
import validationSchema from '../../validation/form';
import { StyledForm } from './Form.styles';
import FormButtonContainer from './FormButtonContainer';
import FormFields from './FormFields';

const Form = ({ id }) => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.invoiceDetails.invoiceDetails);
  const {
    push,
    location: { pathname }
  } = useHistory();

  const newOrEditValues = pathname.includes('edit')
    ? state
    : initialValues;

  const calculateTotalItems = (values) => {
    return values?.items
      ?.map((item) => {
        item['total'] = item.quantity * item.price;
        return item.quantity * item.price;
      })
      .reduce((acc, val) => acc + val);
  };

  const submitNewInvoice = (values) => {
    const submittedFormWithModifications = {
      ...values,
      paymentTerms: +values.paymentTerms.split(' ')[1],
      total: calculateTotalItems(values)
    };
    const invoice = {
      ...submittedFormWithModifications,
      createdAt: new Date(
        submittedFormWithModifications.createdAt
      ).toISOString(),
      paymentDue: moment()
        .add(submittedFormWithModifications.paymentTerms, 'days')
        .toISOString()
    };
    dispatch(submitNewInvoiceAction(invoice));
  };

  const submitEditInvoice = (values) => {
    dispatch(submitEditInvoiceAction(id, values));
    push(`/invoices/all/${id}`);
  };

  return (
    <Formik
      initialValues={newOrEditValues}
      validationSchema={validationSchema}
      onSubmit={
        pathname.includes('edit') ? submitEditInvoice : submitNewInvoice
      }
    >
      {({ values, handleBlur }) => (
        <StyledForm>
          <FormFields values={values} handleBlur={handleBlur} />
          <FormButtonContainer id={id} />
        </StyledForm>
      )}
    </Formik>
  );
};

export default Form;
