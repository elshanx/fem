import styled from 'styled-components';

export const StyledInvoiceSummaryTotal = styled.div`
  border-radius: 0px 0px 0.8rem 0.8rem;
  background: ${({ theme }) => theme.sidebarBg};
  padding: 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.invoiceSummaryTotal.fg};
  background: ${({ theme }) => theme.invoiceSummaryTotal.bg};

  & > span {
    font-size: 1.1rem;
    font-weight: 500;
  }
  & > :last-child {
    font-size: 2rem;
    font-weight: bold;
  }
`;
