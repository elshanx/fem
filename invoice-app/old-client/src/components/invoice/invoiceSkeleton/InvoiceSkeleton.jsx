import Skeleton from 'react-loading-skeleton';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { InvoiceWrapper } from '../invoiceList/InvoiceList.styles';

const InvoiceSkeleton = () => {
  const { width } = useWindowDimensions();

  return (
    <InvoiceWrapper>
      <Skeleton
        style={{ display: 'block', margin: 'auto auto 1.6rem' }}
        width={width < 1440 ? '90vw' : 770}
        height={100}
        count={6}
      />
    </InvoiceWrapper>
  );
};

export default InvoiceSkeleton;
