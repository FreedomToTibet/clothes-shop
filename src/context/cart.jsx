import { createContext, useState, useEffect } from 'react';
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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const count = cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0);
		setCartItemsCount(count);
	}, [cartItems]);

	useEffect(() => {
		const total = cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0);
		setCartTotal(total);
	}, [cartItems]);

	const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));
	const removeItemFromCart = (product) => setCartItems(removeCartItem(cartItems, product));
	const clearItemFromCart = (product) => setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));

  return(
		<CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartItemsCount, cartTotal }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
