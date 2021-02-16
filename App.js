//TODO remove testConstant and switch back to the commented out info to go back to app
import {StatusBar} from 'expo-status-bar';
import React from 'react';

import {StyleSheet, Text, View, Button} from 'react-native';
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

import workoutTabs from './src/components/Navbar/navTabs.js';


const RootStack = createStackNavigator();


const rrfProps = {
    firebase,
    config: firebaseConfig,
    dispatch: myStore.dispatch,
    createFirestoreInstance
};

const App = () => {
  return (
    <Provider store={myStore}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen name="Workout App" component={workoutTabs} />
              <RootStack.Screen name="Login" component={TestView} />
            </RootStack.Navigator>
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

const TestView = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Test View</Text>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
        </View>
    )
};

export default App;