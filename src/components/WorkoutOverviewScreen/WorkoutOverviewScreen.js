import React, { useState } from "react";
import {SafeAreaView,StatusBar,StyleSheet,View, Button, Text, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from "react-redux";
import { FlatList, ScrollView } from 'react-native-gesture-handler';




const WorkoutStack = createStackNavigator();
const data1 = 	[{title: 'Bench', id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', reps:'14', weight: '80kg', checked:0},
      {title: 'Bench',reps:'14', id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', weight: '80kg', checked: 0},
      {title: 'Bench',reps:'14', id: '58694a0f-3da1-471f-bd96-145571e29d72', weight: '80kg', checked: 0}];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pass 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Pass 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pass 3',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pass 4',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pass 5',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pass 6',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pass 7',
  },

  
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);
function WorkoutScreen() {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen name="workout" component={workoutView} />
      <WorkoutStack.Screen name="exercise" component={exerciseView} />
    </WorkoutStack.Navigator>
  );
}

const workoutView = ({ navigation }) => {

 
  const renderItem = ({ item }) => {
    return (

      <Item
        item={item}
        onPress={() => navigation.navigate('exercise')}
      />
    );
  };
    return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  
  );
};


const exerciseView = ({ navigation }) => {
  
  const [isSelected, setSelection] = useState(false);

  const [test1, setSelectedId] = useState(false);
  
   
  
  const renderItem = ({ item }) => {
    

    return (
      <View style={styles.container}  >
      <ScrollView keyboardShouldPersistTaps="always"  contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
      <CheckBox value={isSelected ||test1} onValueChange={test1 === false ? setSelectedId():setSelectedId()} style={{ transform: [{ scaleX: 3 }, { scaleY: 3}] }}/>
       </View>
      <Item item={item} 
      onPress={() => navigation.navigate('workout')} />
       </ScrollView>
      </View>
    );
  };



    return (
    <View  style={styles.container} >
      <ScrollView keyboardShouldPersistTaps="always">
    <CheckBox
          value={isSelected}
          onValueChange={setSelection}
/>
      <FlatList
        data={data1}
        renderItem={renderItem}
        keyExtractor={item => item.id}/>
        </ScrollView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
 
    
  },
  checkbox:{
    

  }

  ,
  item: {
    backgroundColor: '#B8B8B8',
    paddingRight:217,
    padding: 20,
    marginVertical: 7,
    marginHorizontal: 17,
    borderRadius:8,

  },
  title: {
    fontSize: 32,
  },
});

export default WorkoutScreen;