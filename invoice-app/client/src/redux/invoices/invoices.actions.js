import axios from 'axios';
import InvoicesActionTypes from './invoices.types';

export const fetchInvoicesStart = () => ({
  type: InvoicesActionTypes.FETCH_INVOICES_START
});

export const fetchInvoicesSuccess = (invoices) => ({
  type: InvoicesActionTypes.FETCH_INVOICES_SUCCESS,
  payload: invoices
});

export const fetchInvoicesFailure = (errorMessage) => ({
  type: InvoicesActionTypes.FETCH_INVOICES_FAILURE,
  payload: errorMessage
});

export const fetchAllInvoices = () => async (dispatch) => {
  dispatch(fetchInvoicesStart());
  let response;
  try {
    response = await axios.get('http://localhost:5000/api/v1/invoice');
  } catch (error) {
    console.warn(error);
  }
  dispatch(fetchInvoicesSuccess(response.data.invoices));
};

export const submitNewInvoice = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/invoice',
      body
    );
    dispatch({
      type: InvoicesActionTypes.SUBMIT_NEW_INVOICE,
      payload: JSON.stringify(res.data.invoice)
    });
  } catch (err) {
    console.warn(err);
  }
};

export const submitEditInvoice = (id, body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_INVOICES}/${id}`,
      body
    );
    dispatch({
      type: InvoicesActionTypes.SUBMIT_NEW_INVOICE,
      payload: JSON.stringify(res.data.invoice)
    });
  } catch (err) {
    console.warn(err);
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_INVOICES}/${id}`);
    dispatch({
      type: InvoicesActionTypes.DELETE_INVOICE,
      payload: id
    });
  } catch (err) {
    console.warn(err);
  }
};
