import Skeleton from 'react-loading-skeleton';
import { v4 as uuid } from 'uuid';
import {
  DetailsText,
  DetailValues
} from '../mainInvoiceDetails/MainInvoiceDetails.style';

const ClientDetails = ({ clientDetails, clientName }) => {
  return (
    <div>
      <DetailsText mb='1'>Bill To</DetailsText>
      <DetailValues mb='1'>{clientName}</DetailValues>
      {clientDetails ? (
        Object.values(clientDetails).map((detail) => (
          <DetailsText key={uuid()}>{detail}</DetailsText>
        ))
      ) : (
        <Skeleton
          style={{ display: 'block', marginBottom: '0.8rem' }}
          width={70}
          height={10}
          count={4}
        />
      )}
    </div>
  );
};

export default ClientDetails;
