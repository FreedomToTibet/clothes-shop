import {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return(
		<CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
