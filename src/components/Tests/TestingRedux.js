//TODO change buttons below to follow the one working button (PRESS ME)
import React,{useEffect} from 'react';
import {Text, View, Button} from 'react-native';

//handle store listeners and actions
import {useDispatch, useSelector} from 'react-redux'

//import actions
import { loggedInStatus } from '../../redux/actions/testActions';


const TestingRedux = () => {
    //initiate dispatch hook
    const dispatch = useDispatch();
    //hook on current state/store
    const isLoggedIn = useSelector(state => state.exampleReducer.status);

    return (
        <View >
            <Button
                onPress={() => {dispatch(loggedInStatus())}}
                title="Press Me"
            />
            {isLoggedIn ? <Text>User is logged in!</Text>: <Text>User is logged out!</Text>}
            {isLoggedIn ? <Button ><Text>Log out</Text></Button>:<Button onPress={() => {loggedInStatus()}}><Text>Log in</Text></Button>}
        </View>

    );

}

export default TestingRedux;