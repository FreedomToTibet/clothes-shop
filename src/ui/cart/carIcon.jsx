import { useContext } from 'react';

import { CartContext } from '../../context/cart';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cartIcon-styled.jsx';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon src='/shopping-bag.svg' alt='Shopping Bag' className='shopping-icon' />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;