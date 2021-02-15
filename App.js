//TODO remove testConstant and switch back to the commented out info to go back to app
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createFirestoreInstance} from "redux-firestore";
import firebaseConfig from "./config/firebaseConfig";
import firebase from "firebase/app";
import {Provider} from 'react-redux';
import TestingRedux from './src/components/Tests/TestingRedux';
import {myStore} from './src/redux/index'
import {ReactReduxFirebaseProvider} from "react-redux-firebase";


const rrfProps = {
    firebase,
    config: firebaseConfig,
    dispatch: myStore.dispatch,
    createFirestoreInstance
};

/*

                <View style={styles.container}>
                    <Text>Opn up App.js to start working on your app!</Text>
                    <StatusBar style="auto"/>
                </View>
 */

//wrap content in provider and reactredux...
const App = () => {
    return (
        <Provider store={myStore}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <TestingRedux/>
            </ReactReduxFirebaseProvider>
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


export default App;