import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../context/user';
import { CartContext } from '../../context/cart';
import { signOutAuthUser } from '../../utils/firebase';

import CartIcon from '../../ui/cart/carIcon';
import CartDropdown from '../../ui/cart/cartDropdown';

import crownLogo from '/crown.svg';

import './navigation.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
	return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={crownLogo} alt="Crown Logo" className="logo" />
        </Link>
        <div className="nav-links-container">

          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutAuthUser}>SIGN OUT</span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
					<CartIcon />
        </div>
				{ isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
