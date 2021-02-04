import {makeStyles} from "@material-ui/core";

export const usePersonItemOpenStyles = makeStyles(theme => ({
  paperOpen: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    opacity: 1
  },
  avatarOpen: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
    opacity: 1
  },
  titleOpen: {
    flexGrow: 1
  }
}))
