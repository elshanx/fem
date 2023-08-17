import styled from 'styled-components';

export const Text = styled.p`
  color: ${({ theme }) => theme.label};
  text-transform: capitalize;
  margin: 1.5rem 0;
  font-weight: 500;
  line-height: 1.6;
  width: ${({ width }) => `${width}rem`};
  ${({ size }) => size && `font-size: ${size}px`};
  ${({ noCap }) => noCap && `text-transform: none`};

  ${({ mr }) =>
    mr &&
    `
    @media (min-width: 375px) {
      margin-right: 1.4rem;
    }
  `};
  ${({ tags }) =>
    tags &&
    `
    @media (min-width: 375px) {
      font-size: 1rem;
    }
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  `};
  ${({ itemName }) =>
    itemName &&
    `
    @media (min-width: 375px) {
      display: hidden;
    }
  `};
`;
