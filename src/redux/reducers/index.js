//used to combine reducers in store
import { combineReducers } from 'redux'

//reducers
import { firebaseReducer } from "react-redux-firebase";
import { setLoggedInState } from "./testReducer";




const combinedReducers = combineReducers({
    exampleReducer: setLoggedInState,
    firebase: firebaseReducer
});

export default combinedReducers;