import { Fragment } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import { AppProvider } from '../context/AppProvider';

import Navigation from '../pages/navigation/Navigation';
import './RootLayout.scss';

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <AppProvider>
      <Fragment>
        {isLoading && (
          <div className="loading-bar">
            <div className="loading-bar-progress"></div>
          </div>
        )}
        <Navigation />
        <main>
          <Outlet />
        </main>
      </Fragment>
    </AppProvider>
  );
};

export default RootLayout;
