//used to combine reducers in store
import { combineReducers } from 'redux'

//reducers
import { firebaseReducer } from "react-redux-firebase";
import { setLoggedInState } from "./testReducer";
import authReducers from "./authReducers";
import StatsReducer from "./statsReducer";




const combinedReducers = combineReducers({
    exampleReducer: setLoggedInState,
    auth: authReducers,
    firebase: firebaseReducer,
    statReducer: StatsReducer,
});

export default combinedReducers;