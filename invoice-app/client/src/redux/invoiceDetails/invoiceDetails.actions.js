import InvoiceDetailsActionTypes from './invoiceDetails.types';
import axios from 'axios';

export const fetchInvoiceDetailsStart = () => ({
  type: InvoiceDetailsActionTypes.FETCH_INVOICES_DETAILS_START
});

export const fetchInvoiceDetailsSuccess = (invoiceDetails) => {
  return {
    type: InvoiceDetailsActionTypes.FETCH_INVOICES_DETAILS_SUCCESS,
    payload: invoiceDetails
  };
};

export const fetchInvoiceDetailsFailure = (errorMessage) => ({
  type: InvoiceDetailsActionTypes.FETCH_INVOICES_DETAILS_FAILURE,
  payload: errorMessage
});

export const fetchInvoiceDetailsStartAsync = (invoiceId) => {
  return async (dispatch) => {
    dispatch(fetchInvoiceDetailsStart());
    let response;
    try {
      response = await axios.get(
        `http://localhost:5000/api/v1/invoice/${invoiceId}`
      );

      dispatch(fetchInvoiceDetailsSuccess(response.data.invoice));
    } catch (error) {
      console.log(error);
      dispatch(fetchInvoiceDetailsFailure(response.data.error));
    }
  };
};

export const markInvoiceAsPaid = async (id) => {
  try {
    await axios.post(
      `https://invoices-app-api.herokuapp.com/api/v1/invoices/${id}`,
      { status: 'paid' }
    );
  } catch (err) {
    console.warn(err);
  }
};
