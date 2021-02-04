import {makeStyles} from "@material-ui/core";

export const usePersonItemStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))
