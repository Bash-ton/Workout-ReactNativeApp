import React, { useState } from 'react';
import {View, Button, Text} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

const ScheduleStack = createStackNavigator();

function ScheduleScreen() {
  return (
    <ScheduleStack.Navigator>
        <ScheduleStack.Screen name="chooseSchedule" component={chooseScheduleView} />
        <ScheduleStack.Screen name="createSchedule" component={createScheduleView} />
    </ScheduleStack.Navigator>
  );
}


const chooseScheduleView = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Choose a schedule!</Text>
         <Button title="create new schedule!" onPress={() => navigation.navigate('createSchedule')}/>
      </View>
    );
};
const createScheduleView = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Create a schedule!</Text>
         <Button title="back to choose schedule" onPress={() => navigation.navigate('chooseSchedule')}/>
      </View>
    );
};
export default ScheduleScreen;