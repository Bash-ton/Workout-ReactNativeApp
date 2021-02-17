//used to combine reducers in store
import { combineReducers } from 'redux'

//reducers
import { firebaseReducer } from "react-redux-firebase";
import { setLoggedInState } from "./testReducer";
import authReducers from "./authReducers";




const combinedReducers = combineReducers({
    exampleReducer: setLoggedInState,
    auth: authReducers,
    firebase: firebaseReducer,
});

export default combinedReducers;