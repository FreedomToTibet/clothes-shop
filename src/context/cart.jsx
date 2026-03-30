import { createContext, useReducer, useMemo, use } from 'react';
import PropTypes from 'prop-types';

// Helper functions for cart operations
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);
	return existingCartItem.quantity === 1
		? cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
		: cartItems.map((cartItem) =>
				cartItem.id === productToRemove.id
					? { ...cartItem, quantity: cartItem.quantity - 1 }
					: cartItem
		  );
};

// React 19: Context as provider (no .Provider needed)
export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CART_ITEMS': {
      const { cartItems } = payload;
      const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
      
      return {
        ...state,
        cartItems,
        cartItemsCount,
        cartTotal,
      };
    }
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_CART_OPEN':
      return { ...state, isCartOpen: payload };
    case 'CLEAR_CART':
      return { ...state, cartItems: [], cartItemsCount: 0, cartTotal: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Memoize dispatch actions to prevent recreation
  const actions = useMemo(
    () => ({
      addItem: (product) => {
        const newCartItems = addCartItem(state.cartItems, product);
        dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems } });
      },
      removeItem: (product) => {
        const newCartItems = removeCartItem(state.cartItems, product);
        dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems } });
      },
      clearItem: (product) => {
        const newCartItems = state.cartItems.filter((item) => item.id !== product.id);
        dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems } });
      },
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
      setCartOpen: (isOpen) => dispatch({ type: 'SET_CART_OPEN', payload: isOpen }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [state.cartItems]
  );

  return (
    <CartStateContext value={state}>
      <CartDispatchContext value={actions}>
        {children}
      </CartDispatchContext>
    </CartStateContext>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks for consuming context using React 19's use() hook
export function useCartState() {
  const context = use(CartStateContext);
  if (!context) {
    throw new Error('useCartState must be used within CartProvider');
  }
  return context;
}

export function useCartDispatch() {
  const context = use(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }
  return context;
}

// Selector hooks for specific state slices
export function useCartItems() {
  const { cartItems } = useCartState();
  return cartItems;
}

export function useCartCount() {
  const { cartItemsCount } = useCartState();
  return cartItemsCount;
}

export function useCartTotal() {
  const { cartTotal } = useCartState();
  return cartTotal;
}

export function useIsCartOpen() {
  const { isCartOpen } = useCartState();
  return isCartOpen;
}
