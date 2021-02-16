import React from 'react';
import {View, Button, Text} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";


import {NavigationContainer} from '@react-navigation/native';


//login view
import LogInPage from "../LogInPage/LogInPage";

//app view
import workoutTabs from "../Navbar/navTabs";

const WorkoutStack = createStackNavigator();

const RootStack = createStackNavigator();

const Router = () => {
    //redux hooks
    const loggedInStatus = useSelector(state => state.auth.isLogged);

    
    return (
        <RootStack.Navigator>
            {loggedInStatus ? <RootStack.Screen name="Workout App" component={workoutTabs}/>:
                <RootStack.Screen name="Login" component={LogInPage} />}
        </RootStack.Navigator>
    );
}

export default Router;