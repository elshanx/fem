import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/dashboard';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export { router };
