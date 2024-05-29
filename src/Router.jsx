import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ListingDetailsPage from './pages/ListingDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
