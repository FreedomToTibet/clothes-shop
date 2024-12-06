import './cartItem.scss';
import PropTypes from 'prop-types';

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, title, quantity } = cartItem;

  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={`${title}`} />
      <div className='item-details'>
        <span className='title'>{title}</span>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};
CartItem.propTypes = {
  cartItem: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;