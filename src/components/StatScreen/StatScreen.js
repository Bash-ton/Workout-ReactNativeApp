import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

//testing svg
import Svg, {G, Circle, Polyline, Line, Rect} from "react-native-svg";
import {loggedInStatus} from "../../redux/actions/testActions";
import {useDispatch, useSelector} from "react-redux";
import {readCurrentWeek} from "../../redux/actions/statsActions";

const StatStack = createStackNavigator();

function StatScreen() {
    return (
        <StatStack.Navigator>
            <StatStack.Screen name="Stats" component={statsView}/>
        </StatStack.Navigator>
    );
}


/**
 * *** GLOBAL IDEAS ***
 *
 * <Line/> x1,y1: första x,y kordinaten
 * <Line/> x2,y2: andra x,y kordinaten
 *
 * To get first value at correct spot use same dimensions on Line and PolyLine
 *
 * To send values to PolyLine: format -> "x,y x,y x,y"
 *  X-values: week -> divide {windowWidth} by 7 (add padding here to fit label names)
 *            month -> divide {windowWidth} by 4 (add padding here to fit label names)
 *            year  -> divide {windowWidth} by 12 (add padding here to fit label names)
 *
 *  Y-values: Able resize (depending on largest value) ex max value will map to local height value inside graph (% of windowHeight)
 *
 *  parameters to statsView:
 *      current date
 *      value (y-axis)
 *      graph type (ie week/month)
 */

/**
 * *** week graph ***
 *
 * week starts with values from DB through redux: {mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0}
 */
const statsView = ({ navigation }) => {




    const statsState = useSelector(state => state.statReducer.stats)
    const graphType = "week"
    const exerciseName = "excersiseName1";
    const max = useSelector(state => state.statReducer.stats[8].currentLocalMax)

    const dispatch = useDispatch();



    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //graph height depending on screen size
    const graphHeight = (windowHeight / 4);

    //functions

    //map x-values to x-coordinates
    const [xAxisVals, setXAxisVals] = useState({
        mon: 0,
        tue: windowWidth / 7,
        wed: (2 * windowWidth / 7),
        thu: (3 * windowWidth / 7),
        fri: (4 * windowWidth / 7),
        sat: (5 * windowWidth / 7),
        sun: (6 * windowWidth / 7)
    });
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

    //get graph values
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
        console.log("render")

    }, [])


    useEffect(() => {
        dispatch(readCurrentWeek(exerciseName));
        console.log("rerender")

        getXAxisValues();
        getYAxisValues();
        getGraphValuesMapped();
    }, [JSON.stringify(statsState) , JSON.stringify(yAxisVals) ,JSON.stringify(xAxisVals)])




    return (
        <View class="graph">

            {statsState[1] ? <ScrollView keyboardShouldPersistTaps="always">
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
                            {" "}Sun
                        </Text>

                        <Text style={{


                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),

                        }}>
                            {" "}Sat
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            {" "}Fri
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}

                        >
                            {" "}Thu
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,//50
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            {" "}Wed
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),
                        }}>
                            {" "}Tue
                        </Text>

                        <Text style={{
                            width: 50,
                            height: 50,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 16),


                        }}>
                            {" "}Mon
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
                <View>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Button
                            onPress={() => {
                                alert("drop down menu")
                            }}
                            title="Change exercise"
                            color="green"
                        />
                    </ScrollView>
                </View>

            </ScrollView> : <Text>"</Text>}
        </View>
    );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//graph height depending on screen size
const graphHeight = (windowHeight / 4);

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

