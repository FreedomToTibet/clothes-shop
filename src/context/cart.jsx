import {createContext, useState} from 'react';
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

  return(
		<CartContext.Provider value={{ isCartOpen, setIsCartOpen, cartItems, addItemToCart }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
