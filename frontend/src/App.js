import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AppNavbar from './components/layout/AppNavbar';
import PageLanding from './pages/PageLanding';
const App = () => (
  <Router>
    <Fragment className="App">
      <AppNavbar />
      <Route exact path="/" component={PageLanding} />
    </Fragment>
  </Router>
);

export default App;
