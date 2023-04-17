import styled from 'styled-components';

export const StyledActions = styled.div`
  background: ${({ theme }) => theme.invoiceBg};
  border-radius: 0.8rem;
  padding: 2.4rem 3.2rem;

  @media (min-width: 375px) {
    width: 35rem;
    justify-content: space-between;
  }
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    width: 90%;
    gap: 0 1rem;
  }
  @media (min-width: 1440px) {
    width: 70rem;
  }
`;
