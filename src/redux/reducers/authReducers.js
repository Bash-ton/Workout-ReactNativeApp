const initState = {
    authError: null,
    isLogged: false,
}
//TODO change alert here to red informative text on LogInPage instead
const authReducers = (state = initState, action) => {

    switch (action.type){
        case 'LOGIN_ERROR':
            if(action.err.code === 'auth/invalid-email'){
                alert("wrong email");
            }else if(action.err.code === 'auth/wrong-password'){
                alert("wrong password or non matching user and password");
            }
            return {
                ...state,
                authError: 'Login failed',
                isLogged: false,
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null,
                isLogged: true,
            };
        case 'SIGNOUT_SUCCESS':
            console.log("sign out success");
            return {
                ...state,
                authError: null,
                isLogged: false,
            };
        case 'SIGNOUT_ERROR':
            return {
                ...state,
                authError: null,
                isLogged: true,
            };
        default:
            return state
    }
}

export default authReducers