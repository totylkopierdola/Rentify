import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { doSignOut } from '@/firebase/auth';
import {
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';

const Navbar = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      {/* <div className='flex flex-row items-center justify-between gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <div className='flex-end flex flex-row items-center gap-8'>
          <Link to='/favorites'>Favorites</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link>Account</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={doSignOut}>
                <Link to='/'>Sign Out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator /> */}
    </>
  );
};

export default Navbar;
