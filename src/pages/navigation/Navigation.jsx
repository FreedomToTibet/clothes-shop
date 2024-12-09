import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

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
            <span className="nav-link" onClick={signOutAuthUser}>SIGN OUT</span>
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
