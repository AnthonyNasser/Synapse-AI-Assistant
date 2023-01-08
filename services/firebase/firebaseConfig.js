import { initializeApp } from 'firebase/app'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore'
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import { getAnalytics } from 'firebase/analytics'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDAXhVnxrTbDl0NAkHWTJbOIF8fiJJCd-4',
  authDomain: 'chatgptclient-88630.firebaseapp.com',
  projectId: 'chatgptclient-88630',
  storageBucket: 'chatgptclient-88630.appspot.com',
  messagingSenderId: '376013458615',
  appId: '1:376013458615:web:e931a5f7ef6fb8fdb61132',
  measurementId: 'G-XMBN5XFLX5',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
