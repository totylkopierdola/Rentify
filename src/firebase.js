// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { get } from 'react-hook-form';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAiXXwdmPZy9OU4wD5jDy9L23-NlbOcOM4',
  authDomain: 'bookapp-2a36e.firebaseapp.com',
  projectId: 'bookapp-2a36e',
  storageBucket: 'bookapp-2a36e.appspot.com',
  messagingSenderId: '628129418959',
  appId: '1:628129418959:web:fd6f0a7cfeb30a8c12b1ba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
