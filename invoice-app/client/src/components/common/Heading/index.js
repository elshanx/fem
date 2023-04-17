import styled from 'styled-components';

export const Heading = styled.h2`
  color: ${({ theme }) => theme.text};
  ${({ mt }) => mt && `margin-top: ${mt}rem`};
  ${({ mb }) => mb && `margin-bottom: ${mb}rem;`};
  ${({ color }) => color && `color: ${color}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}rem`};
  ${({ width }) => width && `width: ${width}`};

  @media (min-width: 375px) {
    ${({ invoice }) => invoice && `font-size: 2rem`};
  }
  @media (min-width: 1024px) {
    ${({ invoice }) => invoice && `font-size: 3.2rem`};
  }
`;
