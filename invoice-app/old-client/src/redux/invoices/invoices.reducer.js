import InvoicesActionTypes from './invoices.types';

const initialState = {
  invoices: [],
  isFetching: false,
  errorMessage: {}
};

const invoiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case InvoicesActionTypes.FETCH_INVOICES_START:
      return { ...state, isFetching: true };
    case InvoicesActionTypes.FETCH_INVOICES_FAILURE:
      return { ...state, isFetching: false, errorMessage: payload };
    case InvoicesActionTypes.FETCH_INVOICES_SUCCESS:
      return { ...state, isFetching: false, invoices: payload };
    case InvoicesActionTypes.SUBMIT_NEW_INVOICE:
      return { ...state, invoices: [...state.invoices, payload] };
    case InvoicesActionTypes.DELETE_INVOICE:
      return { ...state, invoices: [...state.invoices] };
    case InvoicesActionTypes.EDIT_INVOICE:
      return { ...state, invoices: [...state.invoices] };
    default:
      return state;
  }
};

export default invoiceReducer;
