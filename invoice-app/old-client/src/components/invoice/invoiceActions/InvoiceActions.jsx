import { Button, Text } from '../../common';

import { Flex } from '../../../pages/invoiceDetails/InvoiceDetails.style';
import Status from '../../status/Status';
import { StyledActions } from './InvoiceActions.style';
import { markInvoiceAsPaid } from '../../../redux/invoiceDetails/invoiceDetails.actions';
import { useHistory } from 'react-router';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const InvoiceActions = ({ id, status, setModalIsOpen }) => {
  const { width } = useWindowDimensions();
  const { push } = useHistory();
  const whenPaid = status === 'paid';

  const handleMarkAsPaidClick = () => {
    markInvoiceAsPaid(id);
  };

  return (
    <StyledActions>
      {width < 768 ? (
        <Flex>
          <Text>Status</Text>
          <Status status={status}>{status}</Status>
        </Flex>
      ) : (
        <>
          <Flex>
            <Text>Status</Text>
            <Status status={status}>{status}</Status>
          </Flex>
          <Button third onClick={() => push(`/invoices/edit/${id}`)}>
            Edit
          </Button>
          <Button fifth onClick={() => setModalIsOpen((s) => !s)}>
            Delete
          </Button>
          <Button
            onClick={handleMarkAsPaidClick}
            disabled={whenPaid}
            second
          >
            Mark as Paid
          </Button>
        </>
      )}
    </StyledActions>
  );
};

export default InvoiceActions;
