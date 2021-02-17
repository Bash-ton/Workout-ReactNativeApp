//TODO ADD EXCEPTIONS FOR ADMIN ACCOUNTS (EX if emailverify or admin email)
//TODO MAKE BETTER ERROR INFORMATIVE MESSAGES TO USERS
//TODO REMOVE ADMIN ACCOUNTS LATER? (in singIn or statement)
export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((user) => {
            if(user.user.emailVerified || (credentials.email === "seb@test.se") || (credentials.email === "abdi@test.se") || (credentials.email === "mahdi@test.com")){
                dispatch({ type: 'LOGIN_SUCCESS'})
            }else{
                firebase.auth().signOut().then()
                alert("Please verify your email first!")
            }
        }).catch((err)=> {
            dispatch({ type: 'LOGIN_ERROR', err})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        }).catch((err)=> {
            dispatch({ type: 'SIGNOUT_ERROR', err})
        });
    }
}

export const signUp = ( credentials ) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().createUserWithEmailAndPassword( credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                user.sendEmailVerification().then(
                    firebase.auth().signOut()
                );
    			alert("Please verify your email")
            })
            .catch((error) => {
                alert("sign up failed: " + error)
            });
    }
}