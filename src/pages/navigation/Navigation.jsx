import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../context/user';
import { signOutAuthUser } from '../../utils/firebase';

import crownLogo from '/crown.svg';

import './navigation.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  
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

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
