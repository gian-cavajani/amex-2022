import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBBX5quCgcDehC1riZ2c2qTsIDcSnYJhlQ',
  authDomain: 'amex-2022.firebaseapp.com',
  projectId: 'amex-2022',
  storageBucket: 'amex-2022.appspot.com',
  messagingSenderId: '607711387738',
  appId: '1:607711387738:web:2290504384ccf154b6b863',
  measurementId: 'G-GR32DL7BGN',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
