import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import WorkoutScreen from '../WorkoutOverviewScreen/WorkoutOverviewScreen.js';
import ScheduleScreen from '../ScheduleScreen/ScheduleScreen.js';
import StatScreen from '../StatScreen/StatScreen.js';
import {useSelector} from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function workoutTabs() {
    const loggedInStatus = useSelector(state => state.auth.isLogged);

  return (
    <Tab.Navigator initialRouteName="Workout">
        <Tab.Screen name="Stats" component={StatScreen} options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="chart-line" color={color} size={size} />)}}/>
        <Tab.Screen name="Workout" component={WorkoutScreen} options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="square-edit-outline" color={color} size={size} />)}}/>
    </Tab.Navigator>
  );
}

export default workoutTabs;