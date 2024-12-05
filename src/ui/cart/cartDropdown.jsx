import { useContext } from 'react';

import { CartContext } from '../../context/cart';

import CartItem from '../../components/cart-item/cartItem';
import Button from '../../ui/button/Button';

import './cartDropdown.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

  return (
	<div className='cart-dropdown-container'>
	  <div className='cart-items'>
		{cartItems.map(cartItem => (
		  <CartItem key={cartItem.id} cartItem={cartItem} />
		))}
	  </div>
	  <Button>GO TO CHECKOUT</Button>
	</div>
  );
};

export default CartDropdown;