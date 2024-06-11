import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './ui';

const Route = ({ children, isProtected }) => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isProtected && userLoggedIn === null) {
      navigate('/signin');
    }
  }, [isProtected, userLoggedIn, navigate]);

  if (isProtected && userLoggedIn === null) {
    return <div className='flex justify-center'>XDDDDDDDD</div>;
  }

  return children;
};

export default Route;
