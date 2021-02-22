import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TextInput,  Alert, Modal, StyleSheet, Pressable, SafeAreaView, TouchableOpacity, FlatList, StatusBar, AsyncStorage} from 'react-native'; 
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { getFirestore } from 'redux-firestore';
import {useDispatch, useSelector} from 'react-redux';
import {addSchedule, setCurrentSchedule} from "../../redux/actions/scheduleActions";
import {addRoutine, addExercises} from "../../redux/actions/routineActions";
var uuid = require("uuid");

/*************************** TESTING ******************************************/
var schedulesArray = [];
var currentSchedule = null;
/************************************************************************* */

const ScheduleStack = createStackNavigator();

function ScheduleScreen() {
  return (
    <ScheduleStack.Navigator>
        {/* <ScheduleStack.Screen name="Schedules" component={ScheduleView} /> */}
        <ScheduleStack.Screen name="Routines" component={routineView} />
        <ScheduleStack.Screen name="createRoutine" component={createRoutineView} />
    </ScheduleStack.Navigator>
  );
}

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const ScheduleView = ({ navigation }) => {
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.schedule);
  //current dish
  // const currentSchedule = useSelector(state => state.currentSchedule);
  
  // For testing purposes
/*const clearStorageTest = () => {
    AsyncStorage.clear()
};clearStorageTest();*/

  const [schedules, setSchedules] = useState(schedule);
  useEffect(() => {
    return setSchedules(schedule);
  }, [schedule])

  //current dish
  /*const [currentSchedule, setCurrentSchedule] = useState(currentSchedule);
  useEffect(() => {
    return setCurrentSchedule(currentSchedule);
  }, [currentSchedule])*/

  const createSchedule = (name) => {
    if(!name) console.log('error');
    else{
      dispatch(addSchedule({title: name}));
    } 
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('Routines',{schedule: item.id})}
      />
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Choose a schedule!</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={schedules}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      
      <CreateScheduleModal addSchedule = {createSchedule}/> 
    </View>
  );
};
 
const routineView = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const routine = useSelector(state => state.routines);
  const [routines, setRoutine] = useState(routine);
  useEffect(() => {
    return setRoutine(routine);
  }, [routine]);

  const createRoutine = ({name, exercises}) => {
    let routineID = uuid.v4().toString();
    dispatch(addRoutine({id: routineID, title: name}));
    dispatch(addExercises({id:routineID, exercises: exercises}));
  }

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => alert("exercises for routine")}
      />
    );
  };

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={routines}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>

        <Button title="create new routine" onPress={() => (navigation.navigate('createRoutine', {addRoutine: createRoutine}))}/>
      </View>
    );
};

const createRoutineView = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [exercises, setExercise] = useState([]);
  const {addRoutine} = route.params;
  const addExercise = (name, sets, reps, weight) => {
    setExercise([...exercises, {name: name, sets: sets, reps: reps, weight: weight}]);
  }
  const hasUnsavedChanges = Boolean(name || exercises?.length);
  React.useEffect(() => navigation.addListener('beforeRemove', (e) => {
    // If we don't have unsaved changes, then we don't need to do anything
        if (!hasUnsavedChanges) return;
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput style={{height: 100, fontSize: 30}} placeholder="Routine name" onChangeText={inp => setName(inp)} defaultValue={name}/>
        {exercises.map(ex => <Text>{ex.name} | Sets: {ex.sets} | kg: {ex.weight} | Reps: {ex.reps}</Text>)}
        <Text> </Text>
        <CreateExerciseModal addExercise = {addExercise}/> 
        <Text> </Text>
        <Button title="Save Routine" onPress={() => {navigation.navigate('Routines'); addRoutine({name: name, exercises: exercises});}}/>
      </View>
    );
};

const CreateScheduleModal = ({addSchedule}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  return (
    <View> 
      <Modal style = {styles.centeredView} animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible);}}>
      <View style={styles.modalView}>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="Schedule name" onChangeText={inp => setName(inp)} defaultValue={name}/>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalVisible(!modalVisible); addSchedule(name)}}>
          <Text style= {{textAlign:'center', color:'white'}}>Create</Text>
        </Pressable>
      </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text>Create Schedule</Text>
      </Pressable>
    </View>
  );
};

const CreateExerciseModal = ({addExercise}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <View> 
      <Modal style = {styles.centeredView} animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed."); setModalVisible(!modalVisible);}}>
      <View style={styles.modalView}>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="Exercise name" onChangeText={inp => setName(inp)} defaultValue={name}/>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="# of Sets" onChangeText={inp => setSets(inp)} defaultValue={sets} keyboardType="numeric"/>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="# of Reps" onChangeText={inp => setReps(inp)} defaultValue={reps} keyboardType="numeric"/>
          <TextInput style={{height: 40, fontSize: 20}} placeholder="# of kg" onChangeText={inp => setWeight(inp)} defaultValue={weight} keyboardType="numeric"/>
        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {setModalVisible(!modalVisible); addExercise(name, sets, reps, weight)}}>
          <Text style= {{textAlign:'center', color:'white'}}>Add</Text>
        </Pressable>
      </View>
      </Modal> 
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text>Add Exercise</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 17,
    borderRadius:8,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  }
});

export default ScheduleScreen;