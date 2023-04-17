import styled from 'styled-components';

export const StyledInvoicesHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 375px) {
    width: 90vw;
    padding: 3.2rem 0;
  }
  @media (min-width: 768px) {
    padding: 5.6rem 0;
  }
  @media (min-width: 1440px) {
    width: 77rem;
    padding: 7rem 0 6.5rem;
  }
`;

export const InfoBox = styled.div`
  p {
    font-weight: 500;
    font-size: 12px;
    color: var(--color-gray-2);
  }
`;

export const StyledCreateButton = styled.button`
  background-color: var(--color-figure-1);
  color: #fff;
  border: none;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  padding: 0.8rem;
  align-items: center;
  border-radius: 2.4rem;
  padding-right: 1.8rem;
  cursor: pointer;
  outline: none;

  &:is(:active, :focus) {
    outline: 1px dashed ${({ theme }) => theme.outlineColor};
    outline-offset: 1px;
  }

  &:hover {
    background-color: #9277ff;
  }
`;

export const PlusIconContainer = styled.div`
  padding: 1.1rem;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 1.6rem;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
