import firebaseConfig from "../../config/firebaseConfig";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {getFirebase} from "react-redux-firebase";
import {reduxFirestore, getFirestore} from 'redux-firestore';

//persist store
import {persistStore, persistReducer} from 'redux-persist'
import { AsyncStorage } from 'react-native';

//import all reducers combined
import combinedReducers from "./reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const myStore = createStore(persistedReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirestore, getFirebase})),
        reduxFirestore(firebaseConfig),
    )
);

export const persistor = persistStore(myStore);