import { Route } from 'react-router-dom';
import InvoiceDrawer from './components/invoice/invoiceDrawer/InvoiceDrawer';
import Layout from './components/layout/Layout';
import InvoiceDetails from './pages/invoiceDetails/InvoiceDetails';
import Invoices from './pages/invoices/Invoices';

function App() {
  return (
    <Layout>
      <Route path='/invoice/new'>
        <Invoices />
        <InvoiceDrawer />
      </Route>
      <Route exact path='/'>
        <Invoices />
      </Route>
      <Route exact path='/invoice/:id'>
        <InvoiceDetails />
      </Route>
      <Route path='/invoice/edit/:id/'>
        <InvoiceDetails />
        <InvoiceDrawer />
      </Route>
    </Layout>
  );
}

export default App;
