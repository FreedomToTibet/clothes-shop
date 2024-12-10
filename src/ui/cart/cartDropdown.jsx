import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {CartContext} from '../../context/cart';

import CartItem from '../../components/cart-item/cartItem';
import Button from '../../ui/button/Button';

import {CartDropdownContainer, CartItems} from './cartDropdown-styled.jsx';

const CartDropdown = () => {
  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CartItems>
      <Button onClick={() => navigate('/checkout')}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
