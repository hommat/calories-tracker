import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

type Props = {
  component?: React.ElementType;
};

const AuthGrid: React.FC<Props> = ({ children, component = "div" }) => {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={1} sm={2} md={4} />
        <Grid item xs={10} sm={8} md={4} component={component}>
          {children}
        </Grid>
        <Grid item xs={1} sm={2} md={4} />
      </Grid>
    </Container>
  );
};

export default AuthGrid;
