import Skeleton from 'react-loading-skeleton';
import Tag from '../../tag/Tag';
import { DetailsText } from '../mainInvoiceDetails/MainInvoiceDetails.style';
import SenderAddressDetails from '../senderAddressDetails/SenderAddressDetails';
import {
  GeneralInformation,
  StyledId,
  StyledPersonalInformationContainer
} from './PersonalInformationContainer.style';

const PersonalInformationContainer = ({ invoiceDetails }) => (
  <StyledPersonalInformationContainer>
    <GeneralInformation>
      <StyledId as='div'>
        <Tag>
          {invoiceDetails?.invoiceDetails?.invoiceId || (
            <Skeleton
              style={{ display: 'block', marginBottom: '0.8rem' }}
              width={100}
              height={10}
            />
          )}
        </Tag>
      </StyledId>
      <DetailsText mb='3'>
        {invoiceDetails?.invoiceDetails?.description || (
          <Skeleton style={{ display: 'block' }} width={100} height={10} />
        )}
      </DetailsText>
    </GeneralInformation>
    <SenderAddressDetails
      details={invoiceDetails?.invoiceDetails?.senderAddress}
    />
  </StyledPersonalInformationContainer>
);

export default PersonalInformationContainer;
