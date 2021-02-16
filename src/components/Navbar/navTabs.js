import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import WorkoutScreen from '../WorkoutOverviewScreen/WorkoutOverviewScreen.js';
import ScheduleScreen from '../ScheduleScreen/ScheduleScreen.js';
import StatScreen from '../StatScreen/StatScreen.js';

const Tab = createBottomTabNavigator();

function workoutTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Stats" component={StatScreen} />
    </Tab.Navigator>
  );
}

export default workoutTabs;