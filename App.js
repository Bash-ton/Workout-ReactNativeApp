
import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { createFirestoreInstance } from "redux-firestore";
import firebaseConfig from "./config/firebaseConfig";

import firebase from "firebase/app";
import { Provider } from 'react-redux';
import {myStore, persistor} from './src/redux/index'
import { ReactReduxFirebaseProvider } from "react-redux-firebase";


import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';


//redux persist
import { PersistGate } from 'redux-persist/integration/react'

//route between components/functions/views
import Router from "./src/components/Router/Router";



const rrfProps = {
    firebase,
    config: firebaseConfig,
    dispatch: myStore.dispatch,
    createFirestoreInstance
};

const App = () => {
  return (
    <Provider store={myStore}>
        <PersistGate loading={null} persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <NavigationContainer>
            <Router/>
        </NavigationContainer>
      </ReactReduxFirebaseProvider>
        </PersistGate>
    </Provider>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const TestView = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Test View</Text>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
        </View>
    )
};

export default App;