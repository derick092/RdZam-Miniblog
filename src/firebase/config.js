import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyALhQZmj8azQb3mmzQfGURt2xveQw5i0Z0',
  authDomain: 'rdzam-miniblog.firebaseapp.com',
  projectId: 'rdzam-miniblog',
  storageBucket: 'rdzam-miniblog.appspot.com',
  messagingSenderId: '288927751378',
  appId: '1:288927751378:web:6da2e5e6f0002c022de10b'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export { db }