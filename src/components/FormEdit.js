import React, {useEffect, useRef, useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormLoader from "./FormLoader";
import Button from "@material-ui/core/Button";
import {makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useFirebase} from "react-redux-firebase";
import {v4 as uuidv4} from "uuid";
import {useForm} from "react-hook-form";
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
  nameTitle: {
    textAlign: 'center'
  }
}))



const FormEdit = ({user, userId}) => {

  const classes = useStyles()
  const history = useHistory()
  const firebase = useFirebase()
  const form = useRef(null)
  const fileInput = useRef(null)
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: user.email,
      name: user.name ,
      phone: user.phone,
    },
  });

  const [avatar, setAvatar] = useState(null)
  const [avatarDefault, setAvatarDefault] = useState(DEFAULT_AVATAR)
  const [loading, setLoading] = useState(false)
  const onFileInputChange = () => {
    if(fileInput.current.files.length > 0){
      let file = fileInput.current.files[0]
      let reader = new FileReader()
      reader.onload = () => setAvatar(reader.result)
      reader.readAsDataURL(file)
    }
  }

  useEffect(() =>{
    if(user.image){
      firebase.storage()
        .ref(user.image)
        .getDownloadURL()
        .then( ref => setAvatarDefault(ref))
    }

  },[])

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData(form.current)
    let file = formData.get('avatar')
    let fileName = null;
    if(file.size > 0){
      fileName = uuidv4() + '.' + file.name.split('.').pop()
      await firebase.uploadFile('/',file,null,{name: fileName} )
    }
    data.phone = parseInt(data.phone)
    if(fileName) data.image = fileName
    firebase.update(`users/${userId}`, data)
      .then(snapshot => {
        setLoading(false)
        history.goBack()
      })
  }
  if(!user){
    return <FormLoader/>
  }

  return (
    <form autoComplete="off" ref={form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.avatarPicker}>
        <input accept="image/*" ref={fileInput} onChange={onFileInputChange} className={classes.inputFile} id="icon-button-file" type="file" name="avatar" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <Avatar src={avatar ? avatar : avatarDefault} className={classes.avatarLarge} />
          </IconButton>
          <Typography variant="h5" className={classes.nameTitle} >
            {user.name}
          </Typography>
        </label>
      </div>

      <TextField
        fullWidth
        className={classes.textField}
        error={!!errors.phone}
        id="phone"
        name="phone"
        label="Telefono"
        type="tel"
        defaultValue={user.phone}
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
        defaultValue={user.email}
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
        Editar
      </Button>
      <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
        Volver
      </Button>
    </form>
  );
};

export default FormEdit;
