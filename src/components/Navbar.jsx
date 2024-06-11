import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui';
import { useAuth } from './AuthProvider';
import { doSignOut } from '@/firebase/auth';

const renderLoggedInLinks = () => (
  <>
    <Link to='/'>Home</Link>
    <Link to='/favorites'>Favorites</Link>
    <Link to='/' onClick={doSignOut}>
      Sign Out
    </Link>
  </>
);

const renderLoggedOutLinks = () => (
  <>
    <Link to='/'>Home</Link>
    <Link to='/signup'>Sign Up</Link>
    <Link to='/signin'>Sign In</Link>
  </>
);

const Navbar = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      <div className='flex flex-row justify-center gap-8 px-8 py-4'>
        {userLoggedIn ? renderLoggedInLinks() : renderLoggedOutLinks()}
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
