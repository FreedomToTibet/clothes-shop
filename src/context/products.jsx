import { createContext, useState, useEffect } from "react";

import { getCollectionAndDocuments } from "../utils/firebase";

export const ProductsContext = createContext({
	products: [],
});

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const productsCollection = await getCollectionAndDocuments('categories');
			
			// Transform products to ensure 'title' field exists
			const transformedProducts = Object.keys(productsCollection).reduce((acc, key) => {
				acc[key] = productsCollection[key].map(product => ({
					...product,
					title: product.title || product.name // Use title if exists, otherwise use name
				}));
				return acc;
			}, {});
			
			setProducts(transformedProducts);
		};

		fetchProducts();
	}, []);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};