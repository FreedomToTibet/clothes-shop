import {initializeApp} from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
	signInWithRedirect,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);

// alternative - signInWithPopup(auth, new GoogleAuthProvider());
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const firestoreDB = getFirestore(firebaseApp); // firestoreDB is the database

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(firestoreDB, collectionKey);
	const batch = writeBatch(firestoreDB);

	objectsToAdd.forEach((obj) => {
		const newDocRef = doc(collectionRef, obj.title.toLowerCase());
		batch.set(newDocRef, obj);
	});

	await batch.commit();
	console.log('Collection added');
	return;
};

export const getCollectionAndDocuments = async (collectionKey) => {
	const collectionRef = collection(firestoreDB, collectionKey);
	const collectionSnapshot = await getDocs(query(collectionRef));

	const collectionMap = collectionSnapshot.docs.reduce((accumulator, doc) => {
		const { title, items } = doc.data();
		accumulator[title.toLowerCase()] = items;
		return accumulator;
	}, {});

	return collectionMap;
};

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
		} 
		catch (error) {
			console.error('Error creating user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return null;

	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
	} 
	catch (error) {
		if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already in use');
    } else {
      throw error;
    }
	}
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	try {
		return await signInWithEmailAndPassword(auth, email, password);
	} 
	catch (error) {
		console.error('Error signing in user', error.message);
	}
};

export const signOutAuthUser = async () => {
	try {
		await signOut(auth);
		return true;
	} 
	catch (error) {
		console.error('Error signing out user', error.message);
		return false;
	}
};

export const onAuthStateChangedListener = (callback) => {
	return onAuthStateChanged(auth, callback);
};