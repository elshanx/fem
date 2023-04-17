import styled from 'styled-components';

export const Wrapper = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5rem;
  font-size: 1.5rem;
`;

export const CheckboxInput = styled.span`
  display: grid;
  grid-template-areas: 'checkbox';

  > * {
    grid-area: checkbox;
  }

  input {
    opacity: 0;
    width: 1rem;
    height: 1rem;

    &:checked + .checkbox__control svg {
      transform: scale(0.9);
      color: white;
    }
    &:checked + .checkbox__control {
      background: #7c5dfa;
    }
  }
`;

export const CheckboxControl = styled.span`
  display: inline-grid;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.checkbox.background};

  svg {
    transition: var(--transition);
    transform: scale(0);
  }
`;
