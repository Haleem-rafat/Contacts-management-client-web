import { Outlet } from 'react-router-dom';
import AppLayouts from './shared/layouts/AppLayouts';

function App() {
  return (
    <AppLayouts>
      <Outlet />
    </AppLayouts>
  );
}

export default App;
