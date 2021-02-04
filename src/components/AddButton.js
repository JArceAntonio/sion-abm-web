import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import {useHistory, useLocation} from 'react-router-dom'
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  }
}));
const AddButton = () => {
  const history = useHistory()
  let location = useLocation();
  const classes = useStyles()

  if(location.pathname === '/create'){
    return null
  }

  return (
    <Fab color="primary" aria-label="add" onClick={() => history.push('/create')} className={classes.fab}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
