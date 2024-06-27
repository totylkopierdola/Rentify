import ReactDOM from 'react-dom/client';

// import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

import Router from './Router';

import { Provider } from 'react-redux';

import './index.css';

import { persistor, store } from '@/state/store';
import AuthProvider from './components/AuthProvider';
import { PersistGate } from 'redux-persist/integration/react';

// DO NOT REMOVE: Seeds the local storage database with data
// seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
);
