import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import { ToastContainer } from 'react-toastify';

import store from '@store/store';
import router from '@app/router';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateIfStale: true,
        revalidateOnMount: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        errorRetryInterval: 2000,
        dedupingInterval: 3000,
        loadingTimeout: 5000,
        errorRetryCount: 3,
      }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer />
    </SWRConfig>
  </StrictMode>
);
