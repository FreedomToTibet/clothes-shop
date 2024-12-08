import { useContext, Fragment } from "react";

import { ProductsContext } from "../../context/products";

import ProductCard from "../../components/product-card/productCard";

import './shop.scss';

const Shop = () => {
	const { products } = useContext(ProductsContext);

  return(
		<Fragment>
			{Object.keys(products).map((category) => (
				<Fragment key={category}>
					<h2>{category}</h2>
					<div className="products-container">
						{products[category].map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</Fragment>
			))}
		</Fragment>
	);
};

export default Shop;