import PropTypes from 'prop-types';
import { UserProvider } from './user';
import { ProductsProvider } from './products';
import { CartProvider } from './cart';

/**
 * Combined context provider that nests all application providers
 * Nesting order: UserProvider > ProductsProvider > CartProvider
 * This simplifies provider management in the root layout
 */
export function AppProvider({ children }) {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
