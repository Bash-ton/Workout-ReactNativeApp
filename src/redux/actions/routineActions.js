var uuid = require("uuid");
export const addRoutine = ({id, title}) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const userID = firebase.auth().currentUser.uid;
        const firestore = getFirestore();
        const routineID = uuid.v4().toString();
        const routine = {id: routineID, title: title, userID: userID}
        console.log(routine);
        firestore.collection("Sessions").doc(id).set(routine).then(() => {
            console.log('Success');
            dispatch({type: 'ADD_ROUTINE', routine});
        }).catch((err => {
            dispatch({type: 'Error', err});
        }))
    }
}

export const addExercises = ({id, exercises}) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        var batch = firestore.batch();
    
        exercises.forEach(el => {
            var dbRef = firestore.collection("Sessions").doc(id).collection("Exercises").doc();
            // var coll = firestore.collection("Sessions/"+id+"/Exercises").get();
            // var dbRef = coll.doc();
            batch.set(dbRef, {title: el.name, sets: el.sets, reps: el.reps, weight: el.weight});
        });
        // Commit the batch
        batch.commit().then(() => {
            console.log('Success');
            dispatch({type: 'ADD_EXERCISE'});
        }).catch((err => {
            dispatch({type: 'Error', err});
        }));
    }
}