export const loggedInStatus = () => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'SIGNED_IN'})

    };
}