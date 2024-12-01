import SHOP_DATA from "../../shop-data.json";

const Shop = () => {
  return(
		<div>
			<h1>Shop</h1>
			<div>
				{SHOP_DATA.map(({ id, title }) => (
					<div key={id}>
						<h2>{title}</h2>
						
					</div>
				))}
			</div>
		</div>
	);
};

export default Shop;