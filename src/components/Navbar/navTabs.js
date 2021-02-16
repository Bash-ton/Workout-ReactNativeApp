import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import WorkoutScreen from '../WorkoutOverviewScreen/WorkoutOverviewScreen.js';
import ScheduleScreen from '../ScheduleScreen/ScheduleScreen.js';
import StatScreen from '../StatScreen/StatScreen.js';
import {useSelector} from "react-redux";

const Tab = createBottomTabNavigator();

function workoutTabs() {
    const loggedInStatus = useSelector(state => state.auth.isLogged);

  return (


    <Tab.Navigator>
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Stats" component={StatScreen} />
    </Tab.Navigator>
  );
}

export default workoutTabs;