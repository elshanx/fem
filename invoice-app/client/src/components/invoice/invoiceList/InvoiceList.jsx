import { useEffect } from 'react';
import { Heading, Text } from '../../common';
import NoInvoicesSvg from '../../svgs/NoInvoices.svg';
import Invoice from '../Invoice';
import InvoiceSkeleton from '../invoiceSkeleton/InvoiceSkeleton';
import {
  InvoiceWrapper,
  NoInvoiceWrapper,
  StyledHeader
} from './InvoiceList.styles';
import { useFetchInvoicesQuery } from '../../../services/invoice';

function InvoiceList() {
  const { data: invoices, isLoading } = useFetchInvoicesQuery();

  if (isLoading) return <InvoiceSkeleton />;

  // useEffect(() => {
  //   document.title = `You've got ${invoices.count} invoices`;
  // }, [invoices.count]);

  return (
    <>
      {invoices ? (
        <InvoiceWrapper>
          {invoices.data.map((invoice) => (
            <Invoice key={invoice.id} {...invoice} />
          ))}
        </InvoiceWrapper>
      ) : (
        <NoInvoiceWrapper>
          <NoInvoicesSvg />
          <StyledHeader>
            <Heading width='100%' fontSize='2' mt='8' mb='2.5'>
              There is nothing here
            </Heading>
            <Text noCap width='22' size='12'>
              Create an invoice by clicking the
              <strong> New Invoice </strong>
              button and get started
            </Text>
          </StyledHeader>
        </NoInvoiceWrapper>
      )}
    </>
  );
}

export default InvoiceList;
