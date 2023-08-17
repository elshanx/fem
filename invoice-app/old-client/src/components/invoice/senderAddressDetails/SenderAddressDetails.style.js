import styled from 'styled-components';

export const AdressDetails = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.8rem;
  letter-spacing: -0.229167px;
  color: ${({ theme }) => theme.invoiceDetails.text.fg};
  width: 9.4rem;
  span {
    display: block;
  }
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
  @media (min-width: 768px) {
    text-align: right;
  }
`;
