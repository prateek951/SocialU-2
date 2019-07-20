import React, { Fragment } from 'react';

const PageNotFound = () => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" />
        Page Not Found
      </h1>
      <p>
        Oops...This page does not exists. Contact the admin if you think the
        website is breaking somewhere. We will resolve it as quickly as possible
        For any convenience, please accept our apology.
      </p>
    </Fragment>
  );
};

export default PageNotFound;
