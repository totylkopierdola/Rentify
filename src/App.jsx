import Devbar from '@/components/Devbar/Devbar';
import HomePage from '@/pages/HomePage';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './components/AuthProvider';

const App = () => {
  const { userLoggedIn } = useAuth();
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <h2 onClick={() => console.log('userLoggedIn', userLoggedIn)}>
          logged?
        </h2>
        {userLoggedIn && <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default App;
