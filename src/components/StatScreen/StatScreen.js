import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {Picker} from "@react-native-community/picker";
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

// svg
import Svg, {G, Circle, Polyline} from "react-native-svg";
//redux
import {useDispatch, useSelector} from "react-redux";
import {readCurrentWeek} from "../../redux/actions/statsActions";

//navigation
const StatStack = createStackNavigator();

//handles navbar routing to "stats page"
function StatScreen() {
    return (
        <StatStack.Navigator>
            <StatStack.Screen name="Stats" component={statsView}/>
        </StatStack.Navigator>
    );
}


/**
 * This component renders the statistics page. The data is collected from a database in real time and re-renders when new values are added/updated in the database.
 * All values are then mapped to specific x/y-coordinates on the screen in accordance to screen size and max value.
 * @param navigation used to route through the navbar in the app.
 * @returns {JSX.Element} a graph and a info box showing this users max performance for each exercise.
 */
const statsView = ({ navigation }) => {

    //constants
    const statsState = useSelector(state => state.statReducer.result)
    const graphType = "week"
    const [exerciseName, setExName] = useState("excersiseName1");
    let max = statsState[8].currentLocalMax
    const dispatch = useDispatch();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const graphHeight = (windowHeight / 4);

    //functions
    //render x-values for the graph depending on screen size
    const [xAxisVals, setXAxisVals] = useState({
        mon: 0,
        tue: windowWidth / 7,
        wed: (2 * windowWidth / 7),
        thu: (3 * windowWidth / 7),
        fri: (4 * windowWidth / 7),
        sat: (5 * windowWidth / 7),
        sun: (6 * windowWidth / 7)
    });
    //draw graph showing one week of exercises
    const getXAxisValues = () => {
        switch (graphType) {
            case "week":
                let size = windowWidth / 7;
                setXAxisVals({
                    mon: 0,
                    tue: size,
                    wed: (2 * size),
                    thu: (3 * size),
                    fri: (4 * size),
                    sat: (5 * size),
                    sun: (6 * size)
                })
                break
            default:
                //do
                break
        }
    }

    //map database values to values in graph depending on screen size
    const [yAxisVals, setYAxisVals] = useState({});
    const getYAxisValues = () => {
        switch (graphType) {
            case "week":
                setYAxisVals({
                    mon: ((graphHeight - ((statsState[1].mon / max) * (0.9 * graphHeight)))),
                    tue: (graphHeight - ((statsState[2].tue / max) * (0.9 * graphHeight))),
                    wed: (graphHeight - ((statsState[3].wed / max) * (0.9 * graphHeight))),
                    thu: (graphHeight - ((statsState[4].thu / max) * (0.9 * graphHeight))),
                    fri: (graphHeight - ((statsState[5].fri / max) * (0.9 * graphHeight))),
                    sat: (graphHeight - ((statsState[6].sat / max) * (0.9 * graphHeight))),
                    sun: (graphHeight - ((statsState[7].sun / max) * (0.9 * graphHeight)))
                })
                break
            default:
                //do
                break
        }
    }

    //get graph values from database for each day of the week
    const [graphValues, setGraphValues] = useState()
    const getGraphValuesMapped = () => {
        if (graphType === "week") {
            let val = xAxisVals.mon + "," + yAxisVals.mon + " " + xAxisVals.tue + "," + yAxisVals.tue + " " + xAxisVals.wed + "," + yAxisVals.wed + " " + xAxisVals.thu + "," + yAxisVals.thu + " " + xAxisVals.fri + "," + yAxisVals.fri + " " + xAxisVals.sat + "," + yAxisVals.sat + " " + xAxisVals.sun + "," + yAxisVals.sun + " ";
            setGraphValues(val)
        }
    }

    //lifecycle methods
    useEffect(() => {
        dispatch(readCurrentWeek(exerciseName));
        getXAxisValues();
        getYAxisValues();
        getGraphValuesMapped();
        max = statsState[8].currentLocalMax;
    }, [])


    useEffect(() => {
        dispatch(readCurrentWeek(exerciseName));
        max = statsState[8].currentLocalMax;
        getXAxisValues();
        getYAxisValues();
        getGraphValuesMapped();
    }, [JSON.stringify(statsState), JSON.stringify(yAxisVals), JSON.stringify(xAxisVals) , exerciseName, max])


    const [pickerVal, setPickerVal] = useState("ex1");
    return (
        <View class="graph">
            {statsState[1] ? <ScrollView keyboardShouldPersistTaps="always">
                <View>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Picker
                            selectedValue={pickerVal}
                            onValueChange={(itemValue, itemIndex, itemLabel)=>{setPickerVal(itemValue) , setExName(itemValue)  }}
                        >

                            <Picker.Item label="exercise 1" value="excersiseName1"/>
                            <Picker.Item label="exercise 2" value="exerciseName2"/>

                        </Picker>
                    </ScrollView>
                </View>
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Svg
                            width={windowWidth}
                            height={graphHeight}
                        >
                            <G>
                                <Polyline
                                    fill="none"
                                    stroke="#af58ff"
                                    strokeWidth="2"
                                    points={graphValues}
                                />
                                <G>
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight monday: " + [statsState[1].mon] + "kg")
                                        }}
                                        cx={xAxisVals.mon}
                                        cy={yAxisVals.mon}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight tuesday: " + [statsState[2].tue] + "kg")
                                        }}
                                        cx={xAxisVals.tue}
                                        cy={yAxisVals.tue}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight wednesday: " + [statsState[3].wed] + "kg")
                                        }}
                                        cx={xAxisVals.wed}
                                        cy={yAxisVals.wed}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight thursday: " + [statsState[4].thu] + "kg")
                                        }}
                                        cx={xAxisVals.thu}
                                        cy={yAxisVals.thu}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight friday: " + [statsState[5].fri] + "kg")
                                        }}
                                        cx={xAxisVals.fri}
                                        cy={yAxisVals.fri}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight saturday: " + [statsState[6].sat] + "kg")
                                        }}
                                        cx={xAxisVals.sat}
                                        cy={yAxisVals.sat}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />
                                    <Circle
                                        onPress={() => {
                                            alert("Max weight sunday: " + [statsState[7].sun] + "kg")
                                        }}
                                        cx={xAxisVals.sun}
                                        cy={yAxisVals.sun}
                                        stroke="green"
                                        strokeWidth={4}
                                        r={10}
                                        strokeOpacity={1}
                                        fill="#af58ff"
                                    />


                                </G>


                            </G>
                        </Svg>
                    </ScrollView>
                </View>
                <View style={{backgroundColor: '#fff', height: windowWidth / 7,}}>
                    <ScrollView keyboardShouldPersistTaps="always"
                                contentContainerStyle={{transform: [{rotate: "90deg"}]}}
                    >
                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            -{" "}Sun
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            -{" "}Sat
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            -{" "}Fri
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}
                        >
                            -{" "}Thu
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            -{" "}Wed
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            -{" "}Tue
                        </Text>

                        <Text style={{
                            width: 50,
                            height: 50,
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            -{" "}Mon
                        </Text>
                    </ScrollView>
                </View>
                <View>
                    <ScrollView keyboardShouldPersistTaps="always" style={{
                        position: "relative",
                        backgroundColor: "#af58ff",
                        height: windowWidth * 0.7,
                        borderWidth: 3,
                        flexDirection: "row",
                    }}>
                        <Text
                        >
                            Weight:
                        </Text>
                        <View>
                            <ScrollView keyboardShouldPersistTaps="always"
                                        contentContainerStyle={{flexDirection: 'row'}}>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Current max{"\n"}{max}
                                </Text>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Next target max{"\n"}"20"
                                </Text>
                                <Text
                                >
                                    Goal max{"\n"}"49"
                                </Text>
                            </ScrollView>
                        </View>
                        <Text
                        >
                            Reps:
                        </Text>
                        <View>
                            <ScrollView keyboardShouldPersistTaps="always"
                                        contentContainerStyle={{flexDirection: 'row'}}>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Current max{"\n"}"12"
                                </Text>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Next target max{"\n"}"20"
                                </Text>
                                <Text
                                >
                                    Goal max{"\n"}"49"
                                </Text>
                            </ScrollView>
                        </View>
                        <Text
                        >
                            Cardio:
                        </Text>
                        <View>
                            <ScrollView keyboardShouldPersistTaps="always"
                                        contentContainerStyle={{flexDirection: 'row'}}>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Current max speed{"\n"}"-"
                                </Text>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Next target speed{"\n"}"-"
                                </Text>
                                <Text
                                >
                                    Goal speed{"\n"}"-"
                                </Text>
                            </ScrollView>
                        </View>
                        <View>
                            <ScrollView keyboardShouldPersistTaps="always"
                                        contentContainerStyle={{flexDirection: 'row'}}>

                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Current max dist.{"\n"}"-"
                                </Text>
                                <Text
                                    style={{marginRight: 15}}
                                >
                                    Next target dist.{"\n"}"-"
                                </Text>
                                <Text
                                >
                                    Goal dist.{"\n"}"-"
                                </Text>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView> : <Text>"</Text>}
        </View>
    );
};

//constants for CSS styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//CSS styling
const styles = StyleSheet.create({
//contentContainerStyle={{flexDirection: 'row'}}
    mainContainer: {
        width: windowWidth / 2
    },

    container: {
        flex: 1,

        backgroundColor: '#fff',
        borderWidth: 2

    },
    label: {
        flex: 1,


    }
});

export default StatScreen;

