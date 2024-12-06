import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Navigation from './pages/navigation/Navigation';
import Authentication from './pages/authentication/Authentication';
import Shop from './pages/shop/shop';
import Checkout from './pages/checkOut/checkOut';

function App() {
  

  return (
    <Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
  )
}

export default App
