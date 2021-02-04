import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { createStore, combineReducers } from 'redux'
import {
  firebaseReducer
} from 'react-redux-firebase'

const fbConfig = {
  apiKey: "AIzaSyCByntCG0gIn1M_Lfy5EjnZlmst9BWDSaY",
  authDomain: "flutter-varios-8fb12.firebaseapp.com",
  databaseURL: "https://flutter-varios-8fb12.firebaseio.com",
  projectId: "flutter-varios-8fb12",
  storageBucket: "flutter-varios-8fb12.appspot.com",
  messagingSenderId: "755941897593",
  appId: "1:755941897593:web:57d3c62eabe06def422ba8"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

// Create store with reducers and initial state
const initialState = {}
export const store = createStore(rootReducer, initialState)

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance
}

firebase.storage()
