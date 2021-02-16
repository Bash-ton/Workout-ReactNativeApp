import React from 'react';
import {View, Button, Text} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

const StatStack = createStackNavigator();

function StatScreen() {
  return (
    <StatStack.Navigator>
        <StatStack.Screen name="Stats" component={statsView} />
    </StatStack.Navigator>
  );
}


const statsView = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>All the Stats!</Text>
      </View>
    );
};

export default StatScreen;