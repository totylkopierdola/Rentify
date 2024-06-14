import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ListingFavoritesPage from './pages/ListingFavoritesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Route from './components/Route';
import CreateRentalPage from './pages/CreateRentalPage';
import MyListingsPage from './pages/MyListingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/',
        element: (
          <Route>
            <HomePage />
          </Route>
        ),
      },

      {
        path: '/listings/:listingId',
        element: (
          <Route isProtected>
            <ListingDetailsPage />
          </Route>
        ),
      },
      {
        path: '/favorites',
        element: (
          <Route isProtected>
            <ListingFavoritesPage />
          </Route>
        ),
      },
      {
        path: '/my-listings',
        element: (
          <Route isProtected>
            <MyListingsPage />
          </Route>
        ),
      },
      {
        path: '/create-rental',
        element: (
          <Route isProtected>
            <CreateRentalPage />
          </Route>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
