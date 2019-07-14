import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
// Components and Layout
import AppNavbar from './components/layout/AppNavbar';
//Page Components
import PageLanding from './pages/PageLanding';
import PageRegister from './pages/auth/PageRegister';
import PageLogin from './pages/auth/PageLogin';

const App = () => (
  <Router>
    <Fragment>
      <AppNavbar />
      <Route exact path="/" component={PageLanding} />
      <section className="container">
        <Route exact path="/register" component={PageRegister} />
        <Route exact path="/login" component={PageLogin} />
      </section>
    </Fragment>
  </Router>
);

export default App;
