import { createContext, useEffect, useReducer, useMemo, use } from "react";
import PropTypes from 'prop-types';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase";

// React 19: Context as provider (no .Provider needed)
export const UserStateContext = createContext(null);
export const UserDispatchContext = createContext(null);

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

	// Memoize dispatch actions to prevent recreation
	const actions = useMemo(
		() => ({
			setCurrentUser: (user) =>
				dispatch({ 
					type: USER_ACTION_TYPES.SET_CURRENT_USER, 
					payload: user 
				}),
		}),
		[]
	);

	// Memoize the auth state listener
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) { 
				createUserDocumentFromAuth(user);
			}
			actions.setCurrentUser(user);
		});

		// Proper cleanup for auth subscription
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [actions]);

	return (
		<UserStateContext value={state}>
			<UserDispatchContext value={actions}>
				{children}
			</UserDispatchContext>
		</UserStateContext>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Custom hooks for consuming context using React 19's use() hook
export function useUserState() {
	const context = use(UserStateContext);
	if (!context) {
		throw new Error('useUserState must be used within UserProvider');
	}
	return context;
}

export function useUserDispatch() {
	const context = use(UserDispatchContext);
	if (!context) {
		throw new Error('useUserDispatch must be used within UserProvider');
	}
	return context;
}

// Selector hook for current user
export function useCurrentUser() {
	const { currentUser } = useUserState();
	return currentUser;
}