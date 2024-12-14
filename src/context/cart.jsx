import { createContext, useState, useReducer } from 'react';
import { createAction } from '../reducer/reducer';
import PropTypes from 'prop-types';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);
	return existingCartItem.quantity === 1
		? cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
		: cartItems.map((cartItem) =>
				cartItem.id === productToRemove.id
					? { ...cartItem, quantity: cartItem.quantity - 1 }
					: cartItem
		  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartItemsCount: 0,
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);

	const [{ cartItemsCount, cartTotal, cartItems, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

	const updateCartItemsReducer = (cartItems) => {
    const newCartItemsCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
		
    const payload = {
      cartItems,
      cartItemsCount: newCartItemsCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

	const addItemToCart = (product) => {
		const newCartItems = addCartItem(cartItems, product);
		updateCartItemsReducer(newCartItems);
	}
	
	const removeItemFromCart = (product) => {
		const newCartItems = removeCartItem(cartItems, product);
		updateCartItemsReducer(newCartItems);
	}
	const clearItemFromCart = (product) => {
		const newCartItems = cartItems.filter((cartItem) => cartItem.id !== product.id);
		updateCartItemsReducer(newCartItems);
	}

	const setIsCartOpen = (isOpen) => {
		dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isOpen });
	}

  return(
		<CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartItemsCount, cartTotal }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
