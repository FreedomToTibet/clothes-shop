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
			setProducts(productsCollection);
		};

		fetchProducts();
	}, []);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};