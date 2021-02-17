import React from 'react';
import {View, Button, Text, AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";

const WorkoutStack = createStackNavigator();

function WorkoutScreen() {

  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen name="workout" component={workoutView} />
      <WorkoutStack.Screen name="exercise" component={exerciseView} />
    </WorkoutStack.Navigator>
  );
}


const workoutView = ({ navigation }) => {
    //testing methods
    const clearStorageTest = () => {
        AsyncStorage.clear()
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Alla Pass!</Text>
         <Button title="Pass 1 övningar" onPress={() => navigation.navigate('exercise')}/>
          <Button
              onPress={() => {
                  clearStorageTest()
              }}
              title="clear cache/storage"
          />
      </View>
    );
};
const exerciseView = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Alla övningar!</Text>
         <Button title="Test till passer" onPress={() => navigation.navigate('workout')}/>
      </View>
    );
};
export default WorkoutScreen;