import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './components/AuthProvider';

const App = () => {
  const { userLoggedIn } = useAuth();
  return (
    <>
      {userLoggedIn && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;
