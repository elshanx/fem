import styled from 'styled-components';

export const StyledSidebar = styled.aside`
  background-color: ${({ theme }) => theme.sidebarBg};
  display: flex;
  overflow: hidden;
  z-index: 2;

  .logo {
    position: absolute;
    width: 4rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: var(--transition);

    &:hover {
      transform: translate(-50%, -50%) scale(1.1) rotate(90deg);
    }
  }

  @media (min-width: 375px) {
    border-radius: 0 0 20px 20px;
    justify-content: space-between;
  }
  @media (min-width: 1440px) {
    position: fixed;
    border-radius: 0 20px 20px 0;
    width: 10.3rem;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    z-index: 2;
  } ;
`;

export const SidebarTopContainer = styled.div`
  border-radius: 0px 20px 20px 0px;
  width: 100%;
  height: 10.3rem;
  background-color: var(--color-figure-1);
  display: flex;
  align-items: flex-end;
  position: relative;

  @media (min-width: 375px) {
    width: 8rem;
  }
  @media (min-width: 1440px) {
    width: 100%;
  }
`;

export const SidebarTopContainerBottomPart = styled.div`
  border-radius: 20px 0px 20px 0px;
  background-color: var(--color-figure-2);
  height: 50%;
  width: 100%;
`;

export const SidebarProfile = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.4rem;

  @media (min-width: 375px) {
    border-left: 1px solid var(--color-4);
  }
  @media (min-width: 1440px) {
    border-left: none;
    border-top: 1px solid var(--color-4);
  }
`;

export const ThemeMode = styled.div`
  padding: 3.2rem;

  @media (min-width: 375px) {
    margin: auto 0 auto auto;
  }
  @media (min-width: 1440px) {
    margin: auto auto 0;
  }
`;

export const SidebarProfileImage = styled.img`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  transition: var(--transition);
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Icon = styled.img`
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    transform: scale(1.4);
  }
`;
