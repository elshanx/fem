import styled from 'styled-components';

export const StyledInvoiceItemsWrapper = styled.div`
  padding: 2.4rem;
  background: #f9fafe;
  font-weight: bold;
  font-size: 12px;
  color: #0c0e16;
  background: ${({ theme }) => theme.invoiceDetailsItemsWrapper.bg};

  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: space-between;
  }
  @media (min-width: 768px) {
    grid-template-columns: 20rem 3rem 6rem 6.3rem;
  }
`;

export const ProjectName = styled.span`
  color: ${({ theme }) => theme.invoiceDetailsProjectDescription.fg};
  margin-bottom: 0.8rem;
`;

export const Quantity = styled.p`
  color: #888eb0;
`;

export const StyledInvoiceItemsPrice = styled.p`
  color: ${({ theme }) => theme.invoiceDetailsItemsPrice.fg};
  @media (min-width: 768px) {
    width: 10rem;
    justify-self: center;
  }
  @media (max-width: 768px) {
    justify-self: end;
  }
`;

export const ItemTags = styled.div`
  padding: 2.4rem;
  font-size: 11px;
  font-weight: 500;
  border-radius: 8px 8px 0px 0px;
  display: grid;
  grid-template-columns: 20rem 3rem 6rem 6.3rem;
  grid-template-rows: 1fr;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.invoiceDetails.text.fg};
  background: ${({ theme }) => theme.invoiceDetails.bg};

  & > :last-of-type {
    justify-self: center;
  }
`;

export const StyledItemPrice = styled.span`
  color: ${({ theme }) => theme.invoiceDetails.text.fg};
  @media (min-width: 768px) {
    width: 10rem;
  }
`;
