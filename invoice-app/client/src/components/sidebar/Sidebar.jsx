import {
  Icon,
  SidebarProfile,
  SidebarProfileImage,
  SidebarTopContainer,
  SidebarTopContainerBottomPart,
  StyledSidebar,
  ThemeMode,
} from './Sidebar.styles';

import { Link } from 'react-router-dom';
import LogoImg from '../../assets/logo.svg';
import MoonIcon from '../../assets/icon-moon.svg';
import ProfileImg from '../../assets/image-avatar.jpg';
import SunIcon from '../../assets/icon-sun.svg';

function Sidebar({ theme, toggleTheme }) {
  return (
    <StyledSidebar>
      <SidebarTopContainer>
        <Link to='/invoices/all'>
          <img src={LogoImg} alt='invoice logo' className='logo' />
        </Link>
        <SidebarTopContainerBottomPart></SidebarTopContainerBottomPart>
      </SidebarTopContainer>

      <ThemeMode>
        <Icon
          onClick={toggleTheme}
          src={theme == 'light' ? MoonIcon : SunIcon}
          alt={`${theme} theme icon`}
        />
      </ThemeMode>
      <SidebarProfile>
        <SidebarProfileImage src={ProfileImg} alt='avatar' />
      </SidebarProfile>
    </StyledSidebar>
  );
}

export default Sidebar;
