import Skeleton from 'react-loading-skeleton';
import { StyledInvoiceSummaryTotal } from './InvoiceDetailsSummaryTotal.style';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const InvoiceDetailsSummaryTotal = ({ invoiceDetails }) => {
  const { width } = useWindowDimensions();

  return (
    <StyledInvoiceSummaryTotal>
      <span>{width < 768 ? 'Grand Total' : 'Amount Due'}</span>
      <span>£ {invoiceDetails.invoiceDetails.total || <Skeleton />}</span>
    </StyledInvoiceSummaryTotal>
  );
};

export default InvoiceDetailsSummaryTotal;
