import Devbar from '@/components/Devbar/Devbar';
import HomePage from '@/pages/HomePage';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <Outlet />
      </div>
    </>
  );
};

export default App;
