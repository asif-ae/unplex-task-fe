import { initializeApp } from 'firebase/app'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUTkt6ye-l_-Uf26hpeeBDZytxutkOBZc',
  authDomain: 'express-auto-01.firebaseapp.com',
  projectId: 'express-auto-01',
  storageBucket: 'express-auto-01.appspot.com',
  messagingSenderId: '263587897035',
  appId: '1:263587897035:web:75038ac6cbbd8d1961054e',
}

export const app = initializeApp(firebaseConfig)
