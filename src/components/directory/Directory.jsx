import DirectoryItem from '../directory-item/directoryItem';

import './directory.scss';

const categories = [
	{
		"id": 1,
		"title": "Hats",
		"imageUrl": "/hats.png",
		"route": "shop/hats"
	},
	{
		"id": 2,
		"title": "Jackets",
		"imageUrl": "/jackets.png",
		"route": "shop/jackets"
	},
	{
		"id": 3,
		"title": "Sneakers",
		"imageUrl": "/sneakers.png",
		"route": "shop/sneakers"
	},
	{
		"id": 4,
		"title": "Womens",
		"imageUrl": "/womens.png",
		"route": "shop/womens"
	},
	{
		"id": 5,
		"title": "Mens",
		"imageUrl": "/men.png",
		"route": "shop/mens"
	}
];

const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;