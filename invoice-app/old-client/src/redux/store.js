import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import invoiceAPI from '../services/invoice';

const store = configureStore({
  reducer: {
    [invoiceAPI.reducerPath]: invoiceAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoiceAPI.middleware),
  // .concat(invoiceAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export default store;
