import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import RestaurantGrid from './components/RestaurantGrid/container';
import RestaurantView from './components/RestaurantView';
import Modal from './components/Modal';
import Nav, { NAV_HEIGHT, NAV_VERTICAL_PADDING } from './components/Nav';
import userSlice from './slices/user';
import errorSlice from './slices/error';
import { loadState, saveState } from './services/LocalStorageService';
import { ROUTES } from './constants';
import EditRestaurant from './components/EditRestaurant';
import EditUser from './components/EditUser';
import ErrorMessage from './components/ErrorMessage';

const store = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    error: errorSlice.reducer,
  }),
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  content: {
    top: NAV_HEIGHT + (NAV_VERTICAL_PADDING * 2),
  },
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" style={styles.container}>
          <ErrorMessage />
          <Nav />
          <div style={styles.content}>
            <Switch>
              <Route path={ROUTES.restaurantNew}>
                <EditRestaurant />
              </Route>
              <Route path={ROUTES.restaurantEdit}>
                <EditRestaurant />
              </Route>
              <Route path={ROUTES.restaurant}>
                <Modal backgroundComponent={RestaurantView} />
              </Route>
              <Route path={ROUTES.restaurants}>
                <Modal backgroundComponent={RestaurantGrid} />
              </Route>
              <Route path={ROUTES.userEdit}>
                <EditUser />
              </Route>
              <Route path={ROUTES.signIn}>
                <Modal backgroundComponent={RestaurantGrid} isModalVisible={true} />
              </Route>
              <Route path={ROUTES.home}>
                <Redirect to={ROUTES.restaurants} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
