import styled from 'styled-components';

export const Tag = styled.span`
  color: rgb(136, 142, 176);
`;

export const Wrapper = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  ${({ small }) => small && `font-size: 1.2rem`};
`;
