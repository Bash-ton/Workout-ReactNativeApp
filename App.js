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


import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


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

                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginView}/>
                        <Stack.Screen name="Test" component={TestView}/>
                    </Stack.Navigator>
                </NavigationContainer>

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

const LoginView = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title="Test page" onPress={() => navigation.navigate('Test')}/>
        </View>
    );
};

const TestView = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Test View</Text>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
        </View>
    )
};

export default App;