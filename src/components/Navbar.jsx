import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  CircleUser,
  LayoutList,
  LogOut,
  MenuIcon,
  SquarePlus,
  X,
} from 'lucide-react';
// import { DiamondPlus } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { doSignOut } from '@/firebase/auth';
import { Link } from 'react-router-dom';
import { Button, Separator } from '@/components/ui';
import logo from '../assets/bookApp.png';

const navigation = [
  { name: 'Home', to: '/', current: false },
  { name: 'Favorites', to: '/favorites', current: false },
];

const Navbar = ({ userLoggedIn }) => {
  return (
    <>
      <Disclosure as='nav' className=''>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:ring-opacity-30'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? <X /> : <MenuIcon />}
                  </DisclosureButton>
                </div>
                <a href='/'>
                  <div className=' hidden  justify-center gap-2 xl:flex'>
                    <img src={logo} alt='bookApp' className='h-8' />
                    <h3>BookApp</h3>
                  </div>
                </a>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-end'>
                  <Link to='/'>
                    <div className=' flex  justify-center gap-2 xl:hidden'>
                      <img src={logo} alt='bookApp' className='h-8' />
                      <h3>BookApp</h3>
                    </div>
                  </Link>
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex space-x-4'>
                      {userLoggedIn &&
                        navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <Button variant='ghost'>{item.name}</Button>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  {/* Profile dropdown */}
                  {userLoggedIn && (
                    <Menu as='div' className='relative'>
                      <div>
                        <MenuButton className='relative flex rounded-full  text-sm '>
                          <span className='absolute -inset-1.5' />
                          <span className='sr-only'>Open user menu</span>
                          <CircleUser className='' />
                        </MenuButton>
                      </div>
                      <Transition
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <MenuItems className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to='/my-listings'
                                className={cn(
                                  focus ? 'bg-card' : '',
                                  'flex flex-row-reverse items-center justify-end gap-2  px-4 py-2 text-sm text-accent-foreground',
                                )}
                              >
                                My listings
                                <LayoutList className='h-5 w-5' />
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to='/create-rental'
                                className={cn(
                                  focus ? 'bg-card' : '',
                                  'flex flex-row-reverse items-center justify-end gap-2  px-4 py-2 text-sm text-accent-foreground',
                                )}
                              >
                                Create offer <SquarePlus className='h-5 w-5' />
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to='/'
                                className={cn(
                                  focus ? 'bg-card' : '',
                                  'flex flex-row-reverse items-center justify-end gap-2  px-4 py-2 text-sm text-accent-foreground',
                                )}
                                onClick={() => doSignOut()}
                              >
                                Sign out <LogOut className='h-5 w-5' />
                              </Link>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  )}
                  {!userLoggedIn && (
                    <div className='flex gap-1'>
                      <Link to='/sign-in'>
                        <Button variant='secondary'>Sign in</Button>
                      </Link>
                      <Link to='/sign-up'>
                        <Button variant='outline'>Register</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Transition
              enter='duration-200 ease-out'
              enterFrom='opacity-0 -translate-y-6'
              enterTo='opacity-100 translate-y-0'
              leave='duration-300 ease-out'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-6'
              className='absolute z-10 w-full bg-[#1A1A1A]'
            >
              <DisclosurePanel className='border-t sm:hidden'>
                <div className='space-y-1 px-2 pb-3 pt-2'>
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.to}
                      className={cn(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : ' hover:bg-card hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Separator />
    </>
  );
};

export default Navbar;
