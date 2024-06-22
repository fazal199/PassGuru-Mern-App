
import React, { createContext, useContext } from 'react'
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
    storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_FIREBASE_SENDER_ID}`,
    appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const firebaseContext = createContext();

//firebase methods
const getUserDataFromGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, googleProvider);
    return { userName: user.displayName, userEmail: user.email }
}

const FirebaseProvider = ({ children }) => {
    return (
        <firebaseContext.Provider value={{ getUserDataFromGoogle }}>
            {children}
        </firebaseContext.Provider>
    )
}

const useFirebase = () => useContext(firebaseContext);
export { FirebaseProvider, useFirebase }
