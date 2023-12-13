import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // Modify below
  authDomain: "comunaapp-e6223.firebaseapp.com",
  projectId: "comunaapp-e6223",
  storageBucket: "comunaapp-e6223.appspot.com",
  messagingSenderId: "109898532109",
  appId: "1:109898532109:web:8a8f5b20a38ebd6a9adc44",
  measurementId: "G-M6926G0BR1"
}

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)