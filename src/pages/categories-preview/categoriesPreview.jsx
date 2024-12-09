import { useContext, Fragment } from "react";

import { ProductsContext } from "../../context/products";

import CategoryPreview from "../category-preview/categoryPreview";

const CategoriesPreview = () => {
	const { products } = useContext(ProductsContext);

  return(
		<Fragment>
			{Object.keys(products).map((category) => {
				const product = products[category];
				return <CategoryPreview key={category} title={category} products={product} />
			})}
		</Fragment>
	);
};

export default CategoriesPreview;