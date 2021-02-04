import React, {useEffect, useState} from 'react';
import PersonItem from "../components/PersonItem";
import Grid from "@material-ui/core/Grid";
import {connect}  from 'react-redux'
import {AnimateSharedLayout, AnimatePresence} from "framer-motion";
import PersonItemOpen from "../components/PersonItemOpen";
import { useSelector } from 'react-redux'
import {useFirebase, useFirebaseConnect} from 'react-redux-firebase'


const PersonList = ({users}) => {
  const [selected, setSelected] = useState(null)
  useFirebaseConnect('users')
  const firebase = useFirebase()
  useEffect(() => {
    if(selected){
      let exist = users.find(user => user.key === selected.key)
      if(exist) {
        if(exist.value.image !== selected.value.image){
          firebase.storage()
            .ref(exist.value.image)
            .getDownloadURL()
            .then( ref => setSelected({...exist, avatar: ref})
            )
        }else{

          setSelected({...exist, avatar: selected.avatar})
        }

      }
    }
  }, [users])
  return (
        <AnimateSharedLayout type="crossfade">
          <Grid container direction="column" spacing={2} style={{marginTop: '20px'}}>
            {
              users.map((user, index) =>
                (<PersonItem
                  id={user.key}
                  key={user.key}
                  index={index}
                  {...user.value}
                  onClick={(avatarUrl) => setSelected({...user, avatar: avatarUrl})}/>))
            }
          </Grid>
          <AnimatePresence>
            {
              selected && (<PersonItemOpen
                id={selected.key}
                {...selected.value}
                avatar={selected.avatar}
                onDelete={async () => {
                  await firebase.ref(`users/${selected.key}`).remove()
                  setSelected(null)
                }}
                onClick={() => setSelected(null)}/>)
            }
          </AnimatePresence>

        </AnimateSharedLayout>
  );
};

export default connect((state) => ({
  users: state.firebase.ordered.users ? state.firebase.ordered.users : []
}))(PersonList);
