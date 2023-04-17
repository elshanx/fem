import Skeleton from 'react-loading-skeleton';
import { Container } from './Status.styles';

const Status = ({ status, mr }) => {
  const stateColors = {
    paid: '51, 214, 159',
    pending: '255, 143, 0',
    draft: 'draft'
  };

  return (
    <Container mr={mr} color={stateColors[status]}>
      <span>
        {status || (
          <Skeleton
            style={{ display: 'block', borderRadius: '8px' }}
            height={50}
          />
        )}
      </span>
    </Container>
  );
};

export default Status;
