import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import ErrorBoundary from '@/shared/layouts/ErrorBoundary';
import App from '@/App';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    errorElement: <ErrorBoundary isRoot />,
    children: [],
  },
]);

export default router;
