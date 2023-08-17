import styled from 'styled-components';

export const LinkWrapper = styled.div`
  display: flex;
  gap: 2rem;

  & > a {
    font-weight: bold;
    font-size: 1.2rem;
    text-decoration: none;
    color: ${({ theme }) => theme.goBack.fg};
    transition: var(--transition);

    &:hover {
      color: ${({ theme }) => theme.goBack.hover};
    }
  }

  @media (min-width: 375px) {
    width: 35rem;
    margin: 3rem auto;
  }
  @media (min-width: 768px) {
    width: 90%;
    margin-top: 4rem;
  }
  @media (min-width: 1440px) {
    margin-top: 0;
    padding-top: 6rem;
    width: 70rem;
  }
`;
