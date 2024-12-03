import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/user';
import { ProductsProvider } from './context/products';

import './index.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
			<UserProvider>
				<ProductsProvider>
					<App />
				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
  </StrictMode>,
)
