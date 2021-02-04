import React, {useRef, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from 'react-router-dom'
import {makeStyles} from "@material-ui/core";
import {useFirebase, useFirebaseConnect} from "react-redux-firebase";
import { v4 as uuidv4 } from 'uuid';
import {useForm} from "react-hook-form";
import FormLoader from "./FormLoader";
import {useSelector} from "react-redux";
const DEFAULT_AVATAR = "https://www.w3schools.com/howto/img_avatar.png"
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatarPicker: {
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputFile: {
    display: "none",
  },
  avatarLarge: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderColor: 'black',
    borderWidth: theme.spacing(1)
  },
}))

const Form = () => {

  const classes = useStyles()
  const history = useHistory()
  useFirebaseConnect('users')
  const firebase = useFirebase()
  const users = useSelector((state) => state.firebase.ordered.users ? state.firebase.ordered.users : [])
  const form = useRef(null)
  const fileInput = useRef(null)

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      phone: '',
    },
  });

  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit =async (data) => {
    setLoading(true)
    const formData = new FormData(form.current)
    let file = formData.get('avatar')
    let fileName = null;
    data.phone = parseInt(data.phone)
    if(file.size > 0){
      fileName = uuidv4() + '.' + file.name.split('.').pop()
      await firebase.uploadFile('/',file,null,{name: fileName} )
    }
    if(fileName) data.image = fileName
    firebase.ref('users').push(data, () => {
      setLoading(false)
      history.goBack()
    })


  }

  const onFileInputChange = () => {
    if(fileInput.current.files.length > 0){
      let file = fileInput.current.files[0]
      let reader = new FileReader()
      reader.onload = () => setAvatar(reader.result)
      reader.readAsDataURL(file)

    }
  }


  return (
    <form autoComplete="off" ref={form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.avatarPicker}>
        <input accept="image/*" ref={fileInput} onChange={onFileInputChange} className={classes.inputFile} id="icon-button-file" type="file" name="avatar" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <Avatar src={avatar ? avatar : DEFAULT_AVATAR} className={classes.avatarLarge} />
          </IconButton>
        </label>
      </div>
      <TextField
        fullWidth
        className={classes.textField}
        error={!!errors.name}
        id="name"
        name="name"
        label="Nombre"
        defaultValue={''}
        helperText={errors.name ? (errors.name.message || 'Este nombre ya esta registrado.') : ''}
        required
        inputRef={register({
          required: 'Este campo es obligatorio.',
          validate: value => {
            let existUser = users.find( user => user.value.name === value)
            return !existUser
          }
        })}
      />
      <TextField
        fullWidth
        className={classes.textField}
        error={!!errors.phone}
        id="phone"
        name="phone"
        label="Telefono"
        type="tel"
        defaultValue={''}
        helperText={errors.phone ? errors.phone.message : ''}
        inputRef={register({
          required: 'Debes registrar un numero de telefono.',
          pattern: {
            value: /^\d+$/,
            message: 'Este campo solo permite numeros enteros.',
          },
        })}
      />
      <TextField
        fullWidth
        className={classes.textField}
        error={!!errors.email}
        id="email"
        name="email"
        type="email"
        label="Correo"
        defaultValue={''}
        helperText={errors.email ? errors.email.message : ''}
        inputRef={register({
          required: 'Debes registrar una direccion email.',
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Debes registrar una direccion email valida.',
          },
        })}
      />
      {
        loading && <FormLoader/>
      }
      <Button variant="contained" type="submit" color="primary">
        Registrar
      </Button>
      <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
        Volver
      </Button>
    </form>
  );
};

export default Form;
