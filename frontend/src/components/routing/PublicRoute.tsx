import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { dateToISO } from "../../utils/date";
import { TokenContext } from "../../context/token";

const PublicRoute: React.FC<RouteProps> = props => {
  const { token } = useContext(TokenContext);

  return !token ? (
    <Route exact {...props} />
  ) : (
    <Redirect to={`/day/${dateToISO(new Date())}`} />
  );
};

export default PublicRoute;
