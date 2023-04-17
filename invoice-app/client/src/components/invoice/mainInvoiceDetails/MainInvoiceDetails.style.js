import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;

  @media (min-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 3rem;
  }
`;

export const DetailsText = styled.p`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.5rem;
  letter-spacing: -0.25px;
  color: ${({ theme }) => theme.invoiceDetails.text.fg};
  ${({ mb }) => mb && `margin-bottom: ${mb}rem;`};
`;

export const DetailValues = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  align-self: flex-end;
  ${({ mb }) => mb && `margin-bottom: ${mb}rem`};
`;

export const FlexChild = styled.div`
  align-self: flex-end;
`;

export const FlexParent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const SentTo = styled.div`
  @media (min-width: 375px) {
    margin: 2rem 0 4rem;
  }
  @media (min-width: 768px) {
    margin: 0;
  }
`;

export const StyledDates = styled.div`
  margin-bottom: 2rem;
`;
