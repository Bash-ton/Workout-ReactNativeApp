export const addSchedule = schedule => {
    return (dispatch, {getFirebase}) => {
        dispatch({type: 'ADD_SCHEDULE', schedule});
    }
}

export const removeSchedule = schedule => {
    return (dispatch, {getFirebase}) => {
        dispatch({type: 'REMOVE_SCHEDULE', schedule});
    }
}
  