import { Fragment } from 'react';
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
import { CircleUser, MenuIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { doSignOut } from '@/firebase/auth';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui';

const navigation = [
  { name: 'Home', to: '/', current: false },
  { name: 'Favorites', to: '/favorites', current: false },
];

const Navbar = () => {
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
                <Link to='/'>
                  <h2 className='hidden xl:block'>bookApp</h2>
                </Link>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-end'>
                  <Link to='/'>
                    <h2 className='xl:hidden'>bookApp</h2>
                  </Link>
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex space-x-4'>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={cn(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : ' hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative '>
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
                      <MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to='/'
                              className={cn(
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={() => doSignOut()}
                            >
                              Sign out
                            </Link>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <DisclosurePanel className='sm:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2'>
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.to}
                    className={cn(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : ' hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      <Separator />
    </>
  );
};

export default Navbar;
