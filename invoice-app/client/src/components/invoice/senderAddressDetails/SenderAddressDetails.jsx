import Skeleton from 'react-loading-skeleton';
import { v4 as uuid } from 'uuid';
import { AdressDetails } from './SenderAddressDetails.style';

const SenderAddressDetails = ({ details }) => (
  <AdressDetails>
    {details ? (
      Object.values(details).map((detail) => (
        <span key={uuid()}>{detail}</span>
      ))
    ) : (
      <Skeleton
        count={4}
        width={100}
        height={10}
        style={{ marginBottom: '.8rem' }}
      />
    )}
  </AdressDetails>
);

export default SenderAddressDetails;
