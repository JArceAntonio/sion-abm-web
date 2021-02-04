import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {usePersonItemStyles} from "../styles/usePersonItemStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from "@material-ui/core/Tooltip";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useFirebase} from "react-redux-firebase";


const DEFAULT_IMAGE = 'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png';
const DEFAULT_NAME = 'John Doe'


const PersonItem = ({
  id,
  image,
  name=DEFAULT_NAME,
  onClick,
  index
                    }) => {

  const classes = usePersonItemStyles()
  const firebase = useFirebase()

  const [avatar, setAvatar] = useState(DEFAULT_IMAGE)

  useEffect(() =>{
    if(image){
      firebase.storage()
        .ref(image)
        .getDownloadURL()
        .then( ref => setAvatar(ref))
    }

  },[image])

  return (
      <Grid item lg>
        <motion.div
          initial={{x: 10, opacity: 0}}
          exit={{ opacity: 0, x: -10, transition: { duration: 0.15, delay: index* .2 } }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: .3, delay: index* .1 }}
        >
          <Paper
            component={motion.div}
            elevation={4}
            className={classes.paper}
            layoutId={'person-item'+id}>
            <Avatar component={motion.div}  alt={name} src={avatar} className={classes.avatar} />
            <Typography component={motion.h6} variant={'h6'} className={classes.title} layoutId={'person-item-title-'+id}>
              {name}
            </Typography>
            <Tooltip title="Ver">
              <IconButton component={motion.button} onClick={() => onClick(avatar)} color="inherit">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </motion.div>

      </Grid>
  );
};

export default PersonItem;
