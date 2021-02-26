import React, { useState } from "react";
import {
  Pressable,
  Modal,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import {dispatch,useDispatch,useSelector} from "react-redux";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { getExercises } from "../../redux/actions/workoutDAOActions";
import { useEffect } from "react";


const WorkoutStack = createStackNavigator();
// The current id on the pressed item in the workout view.
let currentID = " ";

// Defince item object used in rendering the flatlist
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

// handlers screen navigation between workout view and exercise view
function WorkoutScreen() {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen name="workout" component={workoutView} />
      <WorkoutStack.Screen name="exercise" component={exerciseView} />
    </WorkoutStack.Navigator>
  );
}

/**
 * This method thakes in an array full of object and a id that it filter to see 
 * f it's exist in and returns that object
 * @param {*} id  is the current id that has been pressed
 * @param {*} dataExercises is the object return from the database, Can be located in workoutDAOAction.js
 */
function extractExerciseData(id,dataExercises){
   let result = dataExercises.filter(test=> test.id===id  );
    return result[0]

}

//Here is the first View where all the schedules are and by pressing on them it will take you to its specifik exercises
const workoutView = ({ navigation }) => {
// Retrives from redux all the schedules created in the ScheduleScreen.js
const routine = useSelector(state => state.routines);
  const [routines, setRoutine] = useState(routine);
  useEffect(() => {
    return setRoutine(routine);
  }, [routine]);

  //It's used by Flatlist to render as many item there is in the object routines
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {navigation.navigate('exercise'),currentID=item.id }}/>//Här ska unik excercie bli fetch beroende på item.id press.
    );
  };
    return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={routines}
        renderItem={renderItem}
        keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
};

//This view renders specific on the action that you have pressed a schedule on the above view.
const exerciseView = () => {
  const [isSelected, setSelection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const dataExercises= useSelector(state=>state.workoutReduced.exercises);
  const dispatch =useDispatch();
  useEffect(()=>{ 
    dispatch(getExercises(currentID))
     }
  ,[]);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}  >
      <ScrollView keyboardShouldPersistTaps="always"  contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{ marginLeft:17,alignItems: 'center', justifyContent: 'center'}}>
      <CheckBox value={isSelected} style={{ transform: [{ scaleX: 3 }, { scaleY: 3}] }}/>
       </View>
      <Item item={item} //Each press results in all the actions here that sets all the states to match the pressed exercise 
      onPress={() => {setModalVisible(true),setSets(extractExerciseData(item.id,dataExercises).sets),
        setReps(extractExerciseData(item.id,dataExercises).reps),setWeight(extractExerciseData(item.id,dataExercises).weight)}}
      styles={styles.item} />
       </ScrollView>
      </View>
    );
  };

    return (
    <View  style={styles.container} >
      <ScrollView keyboardShouldPersistTaps="always">
      <Text style={{marginLeft:5}}>Mark All</Text>
    <CheckBox
          value={isSelected}
          onValueChange={setSelection}
/>
   <Modal style = {styles.centeredView} animationType="slide"  transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible);}}>
      <View style={styles.modalView}>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="# of Sets" defaultValue={"Sets: "+sets}/>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="# of Reps" defaultValue={"Reps: "+reps} />
          <TextInput style={{height: 40, fontSize: 20}} placeholder="# of kg"  defaultValue={"Ibs: "+weight}/>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalVisible(!modalVisible);}}>
          <Text style= {{textAlign:'center', color:'white'}}>Close</Text>
          </Pressable>
      </View>
      </Modal>

      <FlatList
        data={dataExercises}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
        </ScrollView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    margin:20,
    marginTop:300, 
    marginBottom:300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
 
  item: {
    flex:1,
    backgroundColor: '#B8B8B8',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 17,
    borderRadius:8,
 
  },
  title: {
    fontSize: 32,
  },
});

export default WorkoutScreen;