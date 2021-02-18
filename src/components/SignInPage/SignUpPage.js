import React, { useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {useDispatch, useSelector} from "react-redux";


import { signUp } from "../../redux/actions/authActions";


const SignUpPage = ({ navigation }) => {
    //dispatch
    const dispatch = useDispatch();


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


    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always">
                <Text>Email</Text>
                <TextInput
                    style={{height: 40, borderColor: "grey", borderWidth: 1}}
                    onChangeText={(mailInput) => {
                        getEmail(mailInput)
                    }}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 40, borderColor: "grey", borderWidth: 1}}
                    onChangeText={(passwordInput) => {
                        getPassword(passwordInput)
                    }}
                    secureTextEntry={true}
                />
                <Button
                    onPress={() => {
                        dispatch(signUp({email: email, password: password}))
                    }}
                    title="Sign Up"
                />
                <Text style={{color: "red"}} onPress={() => navigation.navigate('Log in')}>{"\n"}Log in</Text>
            </ScrollView>
        </View>
    );
};

export default SignUpPage;

//TODO REMOVE AND ADD PROPER CSS FILE INSTEAD
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});