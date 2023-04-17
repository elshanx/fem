import Skeleton from 'react-loading-skeleton';
import { formatDate } from '../../../helpers/formatDates';
import ClientDetails from '../clientDetails/ClientDetails';
import {
  DetailsText,
  DetailValues,
  FlexChild,
  FlexParent,
  GridContainer,
  SentTo,
  StyledDates
} from './MainInvoiceDetails.style';

const MainInvoiceDetails = ({ invoiceDetails }) => {
  return (
    <GridContainer>
      <FlexParent>
        <StyledDates>
          <DetailsText mb='1'>Invoice Date</DetailsText>
          <DetailValues>
            {invoiceDetails.invoiceDetails.createdAt ? (
              formatDate(invoiceDetails.invoiceDetails.createdAt)
            ) : (
              <Skeleton
                style={{
                  display: 'block',
                  marginBottom: '0.8rem'
                }}
                width={100}
                height={10}
              />
            )}
          </DetailValues>
        </StyledDates>
        <FlexChild>
          <DetailsText mb='1'>Payment Due</DetailsText>
          <DetailValues>
            {invoiceDetails.invoiceDetails.createdAt ? (
              formatDate(invoiceDetails.invoiceDetails.paymentDue)
            ) : (
              <Skeleton
                style={{
                  display: 'block',
                  marginBottom: '0.8rem'
                }}
                width={100}
                height={10}
              />
            )}
          </DetailValues>
        </FlexChild>
      </FlexParent>
      <ClientDetails
        clientName={invoiceDetails.invoiceDetails.clientName}
        clientDetails={invoiceDetails.invoiceDetails.clientAddress}
      />
      <SentTo>
        <DetailsText mb='1'>Sent to</DetailsText>
        <DetailValues>
          {invoiceDetails.invoiceDetails.clientEmail || (
            <Skeleton width={100} />
          )}
        </DetailValues>
      </SentTo>
    </GridContainer>
  );
};

export default MainInvoiceDetails;
