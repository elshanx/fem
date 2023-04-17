import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const invoiceAPI = createApi({
  reducerPath: 'invoiceAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Invoice'],
  refetchOnFocus: false,
  endpoints: (build) => ({
    fetchInvoices: build.query({
      query: () => ({ url: '/invoices' }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Invoice', id: 'LIST' },
              ...result.data.map((invoice) => ({
                type: 'Invoice',
                id: invoice.id,
              })),
            ]
          : [{ type: 'Invoice', id: 'LIST' }],
    }),
    fetchSingleInvoice: build.query({
      query: (id) => ({
        url: `/invoices/${id}`,
      }),
    }),
  }),
});

export const {
  useFetchInvoicesQuery,
  useFetchSingleInvoiceQuery,
} = invoiceAPI;

export default invoiceAPI;
