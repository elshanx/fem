import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import GoBack from '../../components/goBack/GoBack';
import InvoiceActions from '../../components/invoice/invoiceActions/InvoiceActions';
import InvoiceDetailsSummaryTotal from '../../components/invoice/invoiceDetailsSummaryTotal/InvoiceDetailsSummaryTotal';
import InvoiceItems from '../../components/invoice/invoiceItems/InvoiceItems';
import MainInvoiceDetails from '../../components/invoice/mainInvoiceDetails/MainInvoiceDetails';
import PersonalInformationContainer from '../../components/invoice/personalInformationContainer/PersonalInformationContainer';
import Modal from '../../components/modal/Modal';
import { fetchInvoiceDetailsStartAsync } from '../../redux/invoiceDetails/invoiceDetails.actions';
import { deleteInvoice as deleteInvoiceAction } from '../../redux/invoices/invoices.actions';
import { Container, StyledDetails } from './InvoiceDetails.style';

const InvoiceDetails = () => {
  const dispatch = useDispatch();
  const { invoiceDetails } = useSelector((state) => state);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => dispatch(fetchInvoiceDetailsStartAsync(id)), []);

  const cancelDeletion = () => setModalIsOpen(false);

  const deleteInvoice = () => {
    dispatch(deleteInvoiceAction(id));
    push('/');
  };

  useEffect(() => {
    document.title = `Invoice #${id} - ${invoiceDetails.invoiceDetails.status}`;
  }, [id, invoiceDetails.invoiceDetails?.status]);

  return (
    <>
      {modalIsOpen && (
        <Modal
          id={id}
          cancelDeletion={cancelDeletion}
          deleteInvoice={deleteInvoice}
          setModalIsOpen={setModalIsOpen}
        />
      )}
      <GoBack />
      <Container>
        <InvoiceActions
          status={invoiceDetails.invoiceDetails?.status}
          setModalIsOpen={setModalIsOpen}
          id={id}
        />
        <StyledDetails>
          <PersonalInformationContainer invoiceDetails={invoiceDetails} />
          <MainInvoiceDetails invoiceDetails={invoiceDetails} />
          <InvoiceItems items={invoiceDetails.invoiceDetails?.items} />
          <InvoiceDetailsSummaryTotal invoiceDetails={invoiceDetails} />
        </StyledDetails>
      </Container>
    </>
  );
};

export default InvoiceDetails;
