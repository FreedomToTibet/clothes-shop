import { useContext } from "react";

import { ProductsContext } from "../../context/products";

import ProductCard from "../../components/product-card/productCard";

import './shop.scss';

const Shop = () => {
	const { products } = useContext(ProductsContext);

  return(
		<div>
			<h1>Shop</h1>
			<div className="products-container">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Shop;