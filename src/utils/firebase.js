// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analyticsApp = getAnalytics(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const firestoreDB = getFirestore(); // firestore is the database

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
	if (!userAuth) return;

	const userDocRef = doc(firestoreDB, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.error('Error creating user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	try {
		return await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error('Error creating user', error.message);
	}
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	try {
		return await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error('Error signing in user', error.message);
	}
};