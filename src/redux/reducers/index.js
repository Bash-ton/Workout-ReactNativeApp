//used to combine reducers in store
import { combineReducers } from 'redux'

//reducers
import { firebaseReducer } from "react-redux-firebase";
import { setLoggedInState } from "./testReducer";
import authReducers from "./authReducers";
import scheduleReducers from "./scheduleReducers";
import {workoutDAOReducer} from "./workoutDAOReducers";
import {exerciseReducers, routineReducers} from "./routinesReducer";



const combinedReducers = combineReducers({
    exampleReducer: setLoggedInState,
    auth: authReducers,
    firebase: firebaseReducer,
    schedule: scheduleReducers,
    workoutReduced: workoutDAOReducer,
    routines: routineReducers,
    exercise: exerciseReducers
});

export default combinedReducers;