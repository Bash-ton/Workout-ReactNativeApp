export const loggedInStatus = (status) => {
    return (dispatch, getState, { getFirebase }) => {


        dispatch({type: 'SIGNED_IN', item: status})
    };
}