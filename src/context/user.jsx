import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) { 
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};