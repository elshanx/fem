import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  gap: 1.5rem 0;
  transition: var(--transitionSlow);
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 1.5rem;

  @media (min-width: 768px) {
    margin-right: auto;
  }
`;

export const StyledDetails = styled.div`
  background: ${({ theme }) => theme.invoiceBg};
  color: ${({ theme }) => theme.invoiceFg};
  border-radius: 0.8rem;

  @media (min-width: 375px) {
    width: 35rem;
    padding: 2.4rem;
  }
  @media (min-width: 768px) {
    width: 90%;
  }
  @media (min-width: 1440px) {
    width: 70rem;
  }
`;
