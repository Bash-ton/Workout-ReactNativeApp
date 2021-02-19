var uuid = require("uuid");
export const addSchedule = ({title}) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const userID = firebase.auth().currentUser.uid;
        const firestore = getFirestore();
        const schedule = {id: uuid.v4().toString(), title: title, userID: userID}
        console.log(schedule);
        firestore.collection("Schedules").add(schedule).then(() => {
            console.log('Success');
            dispatch({type: 'ADD_SCHEDULE', schedule});
        }).catch((err => {
            dispatch({type: 'Error', err});
        }))
    }
}

// Firestore tar endast bort dokument och inte alla subcollection, Måste hanteras
// t.v kan ta bort från redux
export const removeSchedule = schedule => {
    return (dispatch, {getFirebase}) => {
        dispatch({type: 'REMOVE_SCHEDULE', scheduleObj});
    }
}