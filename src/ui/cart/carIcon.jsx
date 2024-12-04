import { useContext } from 'react';

import { CartContext } from '../../context/cart';

import './cartIcon.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
			<img src='/shopping-bag.svg' alt='Shopping Bag' className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  );
};

export default CartIcon;