import { Fragment, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/user';
import { CartContext } from '../../context/cart';
import { signOutAuthUser } from '../../utils/firebase';

import CartIcon from '../../ui/cart/carIcon';
import CartDropdown from '../../ui/cart/cartDropdown';

import crownLogo from '/crown.svg';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation-styled';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			const success = await signOutAuthUser();
			if (success) {
				navigate('/');
			}
		} catch (error) {
			console.error('Error during sign out:', error);
		}
	};
  
	return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img src={crownLogo} alt="Crown Logo" className="logo" />
        </LogoContainer>
        <NavLinks>

          <NavLink to="/shop">
            SHOP
          </NavLink>

          {currentUser ? (
            <span style={{cursor: 'pointer'}} className="nav-link" onClick={handleSignOut}>SIGN OUT</span>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
					<CartIcon />
        </NavLinks>
				{ isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
