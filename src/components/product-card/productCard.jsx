import './productCard.scss';
import PropTypes from 'prop-types';

import Button from '../../ui/button/Button';

const ProductCard = ({ product }) => {
  const { title, price, imageUrl } = product;
	
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${title}`} />
      <div className='footer'>
        <span className='title'>{title}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted'>Add to cart</Button>
    </div>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;