import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import ErrorBoundary from '@/shared/layouts/ErrorBoundary';
import App from '@/App';
import ContacList from '@/modules/contact/ContacList';
import ContacDetails from '@/modules/contact/_view/ContacDetails';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    errorElement: <ErrorBoundary isRoot />,
    children: [
      {
        path: ROUTES.CONTACT,
        element: <ContacList />,
      },
      {
        path: ROUTES.CONTACT_DETAILS,
        element: <ContacDetails />,
      },
    ],
  },
]);

export default router;
