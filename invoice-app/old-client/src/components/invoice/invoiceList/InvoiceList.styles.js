import styled from 'styled-components';

export const InvoiceWrapper = styled.main`
  margin: 0 auto;

  @media (min-width: 375px) {
    width: 90vw;
  }
`;

export const NoInvoiceWrapper = styled.section`
  margin: 10rem auto 0;
  width: 25rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledHeader = styled.header`
  text-align: center;
`;
