import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/productCard';

import { ProductsContext } from '../../context/products';

import './category.scss';

const Category = () => {
  const { category } = useParams();
  const { products } = useContext(ProductsContext);
  const [goods, setGoods] = useState(products[category]);

  useEffect(() => {
    setGoods(products[category]);
  }, [category, products]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {goods &&
          goods.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;