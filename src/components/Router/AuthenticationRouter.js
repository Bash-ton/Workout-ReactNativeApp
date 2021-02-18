import React from 'react';
import {View, Button, Text} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {useSelector} from "react-redux";

import LogInPage from "../LogInPage/LogInPage";
import SignUpPage from "../SignInPage/SignUpPage";

const WorkoutStack = createStackNavigator();

//TODO ADD FORGOT PASSWORD
const AuthenticationRouter = () => {

    return (
        <WorkoutStack.Navigator>
            <WorkoutStack.Screen name="Sign up" component={SignUpPage} />
            <WorkoutStack.Screen name="Log in" component={LogInPage} />
        </WorkoutStack.Navigator>
    );
}

export default AuthenticationRouter;