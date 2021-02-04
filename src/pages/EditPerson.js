import React from 'react';
import FormEdit from "../components/FormEdit";
import {useParams} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useFirebaseConnect} from "react-redux-firebase";

const EditPerson = () => {

  const { userId } = useParams()
  useFirebaseConnect([
    { path: `users/${userId}` }
  ])

  const user = useSelector(
    ({ firebase: { data } }) => data.users && data.users[userId]
  )

  return (
      <FormEdit user={user} userId={userId}/>
  );
};

export default EditPerson;
