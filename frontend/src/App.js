import React, { Fragment } from 'react';
import './App.css';
import AppNavbar from './components/layout/AppNavbar';
import AppLanding from './components/layout/AppLanding';

const App = () => (
  <Fragment className="App">
    <AppNavbar />
    <AppLanding />
  </Fragment>
);

export default App;
