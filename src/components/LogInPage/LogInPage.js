//TODO add password input

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';

//redux hooks
import {useDispatch, useSelector} from 'react-redux'



//Actions
import { signIn } from "../../redux/actions/authActions";




const LogInPage = () => {
    //dispatch
    const dispatch = useDispatch();

    //redux hooks
    const loggedInStatus = useSelector(state => state.auth.isLogged);


    //local props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    //Event handlers
    const getEmail = (mailInput) => {
        setEmail(mailInput)
    }

    const getPassword = (passwordInput) => {
        setPassword(passwordInput)
    }

    //life cycle methods
 /*   useEffect(() => {
        alert(loggedInStatus)
    }, [loggedInStatus])

  */



    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always">
                <Text>Email</Text>
                <TextInput
                    style={{ height: 40, borderColor: "grey", borderWidth: 1}}
                    onChangeText={(mailInput) => {getEmail(mailInput)}}
                />
                <Text>Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: "grey", borderWidth: 1}}
                    onChangeText={(passwordInput) => {getPassword(passwordInput)}}
                    secureTextEntry={true}
                />
                <Button
                    onPress={() => {dispatch(signIn({email: email, password: password}))}}
                    title="Log In"
                />
            </ScrollView>
        </View>
    );
}

export default LogInPage;

//TODO REMOVE AND ADD PROPER CSS FILE INSTEAD
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});