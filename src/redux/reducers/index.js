//used to combine reducers in store
import { combineReducers } from 'redux'

//reducers
import { firebaseReducer } from "react-redux-firebase";
import { setLoggedInState } from "./testReducer";
import authReducers from "./authReducers";
import scheduleReducers from "./scheduleReducers";
import {workoutDAOReducer} from "./workoutDAOReducers";



const combinedReducers = combineReducers({
    exampleReducer: setLoggedInState,
    auth: authReducers,
    firebase: firebaseReducer,
    schedule: scheduleReducers,
    workoutReduced: workoutDAOReducer
});

export default combinedReducers;