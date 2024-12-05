import './cartItem.scss';

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

export default CartItem;