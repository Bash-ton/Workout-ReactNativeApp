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
import { getFirestore } from 'redux-firestore';
import {getFirebase} from "react-redux-firebase";
import { getExercises } from "../../redux/actions/workoutDAOActions";
import { useEffect } from "react";


const WorkoutStack = createStackNavigator();

let currentID = "";


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

function getExercises1(id,dataExercises){
   let result = dataExercises.filter(test=> test.id===id  );
   console.log(result[0])
    return result[0]

}

const workoutView = ({ navigation }) => {

  //const DATA1= useSelector(state=>state.schedule)
  //const dataExercises= useSelector(state=>state.workoutReduced.exercises)
//console.log(DATA1)
const routine = useSelector(state => state.routines);
  const [routines, setRoutine] = useState(routine);
  useEffect(() => {
    return setRoutine(routine);
  }, [routine]);

  const dispatch =useDispatch();
  const [dataExercisesUpdate, setDataExercisesUpdate] = useState({});
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
      <Item item={item} //Här ska man hämta alla väden för varje pressed item.id.
      onPress={() => {setModalVisible(true),setSets(getExercises1(item.id,dataExercises).sets),setReps(getExercises1(item.id,dataExercises).reps),setWeight(getExercises1(item.id,dataExercises).weight)}}
      styles={styles.item} />
       </ScrollView>
      </View>
    );
  };

    return (
    <View  style={styles.container} >
      <ScrollView keyboardShouldPersistTaps="always">
      <Text>Mark All</Text>
    <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          styles={styles.checkbox}/>
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