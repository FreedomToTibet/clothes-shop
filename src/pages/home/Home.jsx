import { Outlet } from 'react-router-dom';
import Directory from '../../components/directory/directory';

const Home = () => {
  const categories = [
		{
			"id": 1,
			"title": "Hats",
			"imageUrl": "/hats.png"
		},
		{
			"id": 2,
			"title": "Jackets",
			"imageUrl": "/jackets.png"
		},
		{
			"id": 3,
			"title": "Sneakers",
			"imageUrl": "/sneakers.png"
		},
		{
			"id": 4,
			"title": "Womens",
			"imageUrl": "/womens.png"
		},
		{
			"id": 5,
			"title": "Mens",
			"imageUrl": "/men.png"
		}
	];

  return (
		<div>
			<Outlet />
			<Directory categories={categories} />
		</div>
    
  );
};

export default Home;
