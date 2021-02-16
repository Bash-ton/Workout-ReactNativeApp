//TODO change buttons below to follow the one working button (PRESS ME)
import React,{useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

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
        <View style={styles.container}>

            {isLoggedIn ? <Text>User is logged in!</Text>: <Text>User is logged out!</Text>}
            {isLoggedIn?<Button
                onPress={() => {
                    dispatch(loggedInStatus(false))
                }}
                title="Log out"
            />:<Button
                onPress={() => {dispatch(loggedInStatus(true))}}
                title="Log In"
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TestingRedux;