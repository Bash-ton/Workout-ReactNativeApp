import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

//testing svg
import Svg, {G, Circle, Polyline, Line, Rect} from "react-native-svg";


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
const statsView = ({navigation}) => {
    //TODO TEST LISTEN FOR MAX VALUE IN REDUX MAYBE

    //test values (later take from redux)
    const reduxTestAllValues = {mon: 10, tue: 12, wed: 0, thu: 5, fri: 0, sat: 23, sun: 12};
    const graphType = "week"

    //const [max, setMax] = useState(0);
    //TODO ADD FUNCTIONALITY FOR MONTH AND YEAR AS WELL (ex change 7, change arr in accordance to {graphType})
    //return only value. date does not matter
    const getMaxYVal = () => {
        let localMax = reduxTestAllValues.mon
        let arr = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        let i = 0;
        let l = 0;
        while (i < 7) {
            if (localMax < reduxTestAllValues[arr[i]]) {
                localMax = reduxTestAllValues[arr[i]]
                l = i;
            }
            i++;
        }
        return localMax;

    }
    const max = getMaxYVal();


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
    //TODO CHANGE DEFAULT VALUE TO ZERO IF YOU CAN ABLE RE RENDERING
    const [yAxisVals, setYAxisVals] = useState({
        mon: ((graphHeight - ((reduxTestAllValues.mon / max) * (0.9 * graphHeight)))),
        tue: (graphHeight - ((reduxTestAllValues.tue / max) * (0.9 * graphHeight))),
        wed: (graphHeight - ((reduxTestAllValues.wed / max) * (0.9 * graphHeight))),
        thu: (graphHeight - ((reduxTestAllValues.thu / max) * (0.9 * graphHeight))),
        fri: (graphHeight - ((reduxTestAllValues.fri / max) * (0.9 * graphHeight))),
        sat: (graphHeight - ((reduxTestAllValues.sat / max) * (0.9 * graphHeight))),
        sun: (graphHeight - ((reduxTestAllValues.sun / max) * (0.9 * graphHeight)))
    });
    const getYAxisValues = () => {
        switch (graphType) {
            case "week":
                setYAxisVals({
                    mon: ((graphHeight - ((reduxTestAllValues.mon / max) * (0.9 * graphHeight)))),
                    tue: (graphHeight - ((reduxTestAllValues.tue / max) * (0.9 * graphHeight))),
                    wed: (graphHeight - ((reduxTestAllValues.wed / max) * (0.9 * graphHeight))),
                    thu: (graphHeight - ((reduxTestAllValues.thu / max) * (0.9 * graphHeight))),
                    fri: (graphHeight - ((reduxTestAllValues.fri / max) * (0.9 * graphHeight))),
                    sat: (graphHeight - ((reduxTestAllValues.sat / max) * (0.9 * graphHeight))),
                    sun: (graphHeight - ((reduxTestAllValues.sun / max) * (0.9 * graphHeight)))
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
        getXAxisValues();
        getYAxisValues();
        getGraphValuesMapped();
    }, [])

//TODO change the number of <Text/> depending on {graphType}
//TODO Find correct align with text
    return (
        <View class="graph" style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.container}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Svg
                            width={windowWidth}
                            height={graphHeight}
                        >
                            <G>
                                <Polyline
                                    fill="none"
                                    stroke="#0074d9"
                                    strokeWidth="2"
                                    points={graphValues}
                                />
                                <G>



                                </G>


                            </G>
                        </Svg>
                    </ScrollView>
                </View>
                <View>
                    <ScrollView keyboardShouldPersistTaps="always" style={styles.label} contentContainerStyle={{transform: [{rotate: "90deg"}]}}
                               >

                        <Text style={{



                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 20),



                        }}>
                            {" "}Sun
                        </Text>

                        <Text style={{


                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 20),

                        }}>
                            {" "}Sat
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 20),
                        }}>
                            {" "}Fri
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 20),
                        }}

                        >
                            {" "}Thu
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,//50
                            height: windowWidth / 7,


                            position: "relative",
                            paddingTop: (windowWidth / 7 -16),
                        }}>
                            {" "}Wed
                        </Text>

                        <Text style={{
                            width: windowWidth / 7,
                            height: windowWidth / 7,

                            
                            position: "relative",
                            paddingTop: (windowWidth / 7 - 20),
                        }}>
                            {" "}Tue
                        </Text>

                        <Text style={{
                            width: 50,
                            height: 50,


                            position: "relative",
                            paddingTop: (windowWidth / 7 - 20),


                        }}>
                            {" "}Mon
                        </Text>


                    </ScrollView>
                </View>

            </ScrollView>
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
        width: windowWidth/2
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