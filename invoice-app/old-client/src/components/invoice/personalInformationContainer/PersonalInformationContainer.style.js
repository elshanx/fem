import styled from 'styled-components';

export const StyledPersonalInformationContainer = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const GeneralInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledId = styled.p`
  font-weight: 700;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.text};

  @media (min-width: 375px) {
    font-size: 1.2rem;
  }
  @media (min-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;
