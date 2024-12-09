import { useContext } from 'react';

import { CartContext } from '../../context/cart';

import Button from '../../ui/button/Button';

import './productCard.scss';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const { title, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartContext);
	
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${title}`} />
      <div className='footer'>
        <span className='title'>{title}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={() => addItemToCart(product)} >Add to cart</Button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;