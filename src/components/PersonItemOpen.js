import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {usePersonItemOpenStyles} from '../styles/usePesonItemOpenStyles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {motion} from "framer-motion";
import {Container} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {useHistory} from "react-router-dom";
import '../styles/css/PersonItemOpen.css';
const DEFAULT_NAME = 'John Doe'


const PersonItemOpen = ({
                      id,
                      image,
                      avatar,
                      name=DEFAULT_NAME,
                      phone=DEFAULT_NAME,
                      email=DEFAULT_NAME,
                      onClick,
                      onDelete
                    }) => {

  const classes = usePersonItemOpenStyles()
  const history = useHistory()


  const handleDelete = async () => {
    let result = await Swal.fire({
      title: 'Estas seguro de eliminar estos datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
    if(result.isConfirmed){
      onDelete()
      Swal.fire({
        title: 'Datos eliminados correctamente!',
        icon: 'success',
      })
    }

  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
      />
      <div className="item-open">
        <Container maxWidth="md">
          <Paper component={motion.div} elevation={4}  className={classes.paperOpen} layoutId={'person-item'+id}>
            <div className="header-open">
              <Avatar component={motion.div}  alt={name} src={avatar}  className={classes.avatarOpen} />
              <Typography component={motion.h6} variant={'h6'} className={classes.titleOpen} layoutId={'person-item-title-'+id}>
                {name}
              </Typography>
              <Tooltip title="Cerrar">
                <IconButton onClick={onClick}>
                  <CloseIcon/>
                </IconButton>
              </Tooltip>

            </div>
            <List>
              <ListItem>
                <ListItemText
                  primary={'Nombre'}
                  secondary={name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={'Telefono'}
                  secondary={phone}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={'Correo'}
                  secondary={email}
                />
              </ListItem>
            </List>
            <div className="button-section-open">
              <Tooltip title="Editar">
                <IconButton onClick={() => history.push(`/edit/${id}`)}>
                  <EditIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>
            </div>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default PersonItemOpen;
