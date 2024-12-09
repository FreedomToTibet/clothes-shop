import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categoriesPreview';
import Category from '../category/category';

import './shop.scss';

const Shop = () => {
	

  return(
		<Routes>
			<Route path="/" element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;