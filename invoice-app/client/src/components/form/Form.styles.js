import styled from 'styled-components';
import { Form } from 'formik';

export const StyledForm = styled(Form)`
  overflow: hidden scroll;
  height: 100%;
  padding: 0 5rem 3rem 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }) => theme.scrollbarColor};
    transition: var(--transition);

    &:active {
      background: rgb(228, 234, 246);
    }
  }

  @media (min-width: 375px) {
    padding: 0 0 3rem 0;
  }
`;

export const BillToFrom = styled.p`
  color: var(--color-figure-1);
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.formInputBg};
  color: ${({ theme }) => theme.text};
  min-height: 5rem;
  border-radius: 4px;
  border: ${({ theme }) => theme.formInputBorderInactive};
  outline: var(--color-figure-1);
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  text-indent: 2rem;
  text-transform: ${({ postCode }) => postCode && 'uppercase'};
  transition: var(--transition);

  &:is(:active, :focus) {
    border: ${({ theme }) => theme.formInputBorderActive};
  }

  ${({ mr }) => mr && `margin-right: 2.5rem;`};

  ${({ date }) =>
    date &&
    `
    text-indent: 1rem; 
    padding-right: 2rem;
  `};

  @media (min-width: 375px) {
    width: 30rem;
  }
  @media (min-width: 520px) {
    width: 50rem;
  }
  @media (min-width: 768px) {
    width: ${({ large }) => (large ? '50rem' : '15rem')};
  }

  ${({ half }) =>
    half &&
    `    
    margin-right: 2rem;
    @media (min-width: 768px) {
      width: 24rem;
    }
  `};
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;

  ${({ mb }) => mb && `margin-bottom: ${mb}rem;`};
  @media (min-width: 375px) {
    flex-wrap: wrap;
  }
`;

export const Select = styled.select`
  background: ${({ theme }) => theme.formInputBg};
  color: ${({ theme }) => theme.text};
  min-height: 5rem;
  width: 24rem;
  border-radius: 4px;
  border: 1px solid #dfe3fa;
  outline: var(--color-figure-1);
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  text-indent: 2rem;
  transition: var(--transition);

  &:is(:active, :focus) {
    border: 1px solid var(--color-figure-1);
  }
`;

export const DateInput = styled(Input)`
  text-indent: 1rem;
`;

export const ItemInputs = styled(Input)`
  width: ${({ width }) => `${width}rem`};
  ${({ mr }) => mr && `margin-right: ${mr}rem`};
  ${({ itemName }) =>
    itemName &&
    `
    @media (max-width: 520px) {
      display: block;
      width:100%;
      margin-bottom: 1rem;
    }
  `};
`;

export const IconContainer = styled.div`
  margin-left: ${({ ml }) => `${ml}rem`};
  outline: none;
  &:active,
  &:focus {
    outline: 1px dashed ${({ theme }) => theme.outlineColor};
    outline-offset: 5px;
  }
`;

export const TotalInput = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  background: ${({ theme }) => theme.formInputTotal};
  color: #888eb0;
  text-indent: 0.3rem;
  border: none;
  outline: none;
  width: 4rem;
  height: 5rem;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  margin: 4rem 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: 768px) {
    width: 95%;
  }
`;
