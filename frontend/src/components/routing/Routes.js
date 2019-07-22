import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageRegister from '../../pages/auth/PageRegister';
import PageDashboard from '../../pages/dashboard/PageDashboard';
import PageCreateProfile from '../../pages/profile-form/PageCreateProfile';
import PageEditProfile from '../../pages/profile-form/PageEditProfile';
import PageAddExperience from '../../pages/profile-form/PageAddExperience';
import PageAddEducation from '../../pages/profile-form/PageAddEducation';
import PageLogin from '../../pages/auth/PageLogin';
import AppAlert from '../layout/AppAlert';
import PrivateRoute from './PrivateRoute';
import PageNotFound from '../../pages/PageNotFound';
import PageProfiles from '../../pages/profiles/PageProfiles';
import SingleProfile from '../../pages/profile/SingleProfile';

const Routes = () => {
  return (
    <section className="container">
      <AppAlert />
      <Switch>
        <Route exact path="/register" component={PageRegister} />
        <Route exact path="/login" component={PageLogin} />
        <Route exact path="/profiles" component={PageProfiles} />
        <Route exact path="/profile/:userId" component={SingleProfile} />

        <PrivateRoute exact path="/dashboard" component={PageDashboard} />
        <PrivateRoute
          exact
          path="/create-profile"
          component={PageCreateProfile}
        />
        <PrivateRoute exact path="/edit-profile" component={PageEditProfile} />
        <PrivateRoute
          exact
          path="/add-experience"
          component={PageAddExperience}
        />
        <PrivateRoute
          exact
          path="/add-education"
          component={PageAddEducation}
        />
        <Route component={PageNotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
