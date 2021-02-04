import {useLayoutStyles} from "../styles/useLayoutStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import {AnimateSharedLayout} from "framer-motion";
import React from "react";
import {useFirebase} from "react-redux-firebase";

const Layout = (props) => {
  const firebase = useFirebase()
  const classes = useLayoutStyles()

  return (
    <AnimateSharedLayout type="crossfade">
      <CssBaseline/>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ABM Personas
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth={'md'}>
        <Box>
          {props.children}
        </Box>
      </Container>
    </AnimateSharedLayout>
  );
};

export default Layout;
