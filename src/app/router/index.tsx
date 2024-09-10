import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

import ErrorBoundary from '@/shared/layouts/ErrorBoundary';
import App from '@/App';

import ContacList from '@/modules/Contact/ContacList';
import ContacDetails from '@/modules/Contact/_view/ContacDetails';
import CreateContact from '@/modules/CreateContact/CreateContact';

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
      {
        path: ROUTES.CREATE_CONTACT,
        element: <CreateContact />,
      },
    ],
  },
]);

export default router;
