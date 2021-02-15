
import firebaseConfig from "../../config/firebaseConfig";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from 'redux-firestore';

//import all reducers combined
import combinedReducers from "./reducers";

export const myStore = createStore(combinedReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebaseConfig)
    )
);