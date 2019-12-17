import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import EntityDetailsPage from './pages/entity-details/entity-details.page';
import GroupListPage from './pages/group-list/group-list.page';
import ErrorPage from './pages/error/error.page';
import EntityType from './utils/constants';
import ImageListPage from './pages/image-list/image-list.page';
import LoginPage from './pages/login/login.page';
import HomePage from './pages/home/home.page';
import GroupPage from './pages/group/group.page';

const Routes = (props) => {
  const { openSnackbar, toggleNavContainer, isEditable } = props;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (<HomePage {...routeProps} />);
        }}
      />
      <Route
        exact
        path="/login"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (<LoginPage {...routeProps} />);
        }}
      />
      <Route
        exact
        path="/images"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <ImageListPage
              {...routeProps}
              openSnackbar={openSnackbar}
            />
          );
        }}
      />
      <Route
        exact
        path="/image"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <EntityDetailsPage
              {...routeProps}
              entityType={EntityType.IMAGE}
              openSnackbar={openSnackbar}
            />
          );
        }}
      />
      <Route
        path="/image/:id"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <EntityDetailsPage
              {...routeProps}
              entityType={EntityType.IMAGE}
              openSnackbar={openSnackbar}
            />
          );
        }}
      />
      <Route
        exact
        path="/groups"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (<GroupListPage {...routeProps} />);
        }}
      />
      <Route
        exact
        path="/group"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <EntityDetailsPage
              {...routeProps}
              entityType={EntityType.GROUP}
              openSnackbar={openSnackbar}
            />
          );
        }}
      />
      <Route
        path="/group/:id"
        render={(routeProps) => {
          toggleNavContainer(false);
          return (
            <GroupPage
              {...routeProps}
              openSnackbar={openSnackbar}
              isEditable={isEditable}
            />
          );
        }}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
};

Routes.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
  toggleNavContainer: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
};

Routes.defaultProps = {
  isEditable: false,
};

export default Routes;
