import { Switch, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import GlobalStyle from '../../styles/GlobalStyles';
import Sidebar from '../sidebar/Sidebar';
import { ThemeProvider } from 'styled-components';
import useDarkTheme from '../../hooks/useDarkTheme';

const Layout = ({ children }) => {
  const [themes, theme, toggleTheme] = useDarkTheme();
  const location = useLocation();

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <Switch location={location} key={location.pathname}>
          {children}
        </Switch>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Layout;
