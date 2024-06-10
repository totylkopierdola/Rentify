import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ListingFavoritesPage from './pages/ListingFavoritesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
      {
        path: '/favorites',
        element: <ListingFavoritesPage />,
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
