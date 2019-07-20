import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components and Layout
import AppNavbar from './components/layout/AppNavbar';
//Page Components
import PageLanding from './pages/PageLanding';
import PageRegister from './pages/auth/PageRegister';
import PageLogin from './pages/auth/PageLogin';
import AppAlert from './components/layout/AppAlert';
// Redux Imports
import { Provider } from 'react-redux';
import store from './store';
// Styles
import './App.css';
import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './actions/authActions';
import PageDashboard from './pages/dashboard/PageDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import PageCreateProfile from './pages/profile-form/PageCreateProfile';
import PageEditProfile from './pages/profile-form/PageEditProfile';
// Check whether there is token in the local storage
if (localStorage.token) {
  // 2. Set the Auth token in the local storage in the global
  // headers
  setAuthToken(localStorage.token);
}

const App = () => {
  // 1. Load the user on each mount or update of component
  // We need to check for authentication status always
  // since JWT is stateless

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <AppNavbar />
          <Route exact path="/" component={PageLanding} />
          <section className="container">
            <AppAlert />
            <Switch>
              <Route exact path="/register" component={PageRegister} />
              <Route exact path="/login" component={PageLogin} />
              <PrivateRoute exact path="/dashboard" component={PageDashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={PageCreateProfile}
              />
              <PrivateRoute
                exact 
                path="/edit-profile"
                component={PageEditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
