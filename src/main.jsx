import ReactDOM from 'react-dom/client';

// import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

import Router from './Router';

import { Provider } from 'react-redux';

import './index.css';

import { store } from '@/state/store';
import AuthProvider from './components/AuthProvider';

// DO NOT REMOVE: Seeds the local storage database with data
// seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  </ThemeProvider>,
);
