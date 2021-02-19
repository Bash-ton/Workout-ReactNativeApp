export const readCurrentWeek = (exerciseName) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

        const firestore = getFirestore();
        const firebase = getFirebase();

        const userID = firebase.auth().currentUser.uid

        const currentDate = (new Date().getFullYear() + "-" + (new Date().getMonth() + 1));

        //const reduxTestAllValues = {mon: 10, tue: 12, wed: 0, thu: 5, fri: 0, sat: 23, sun: 15};
        let result = [];


        firestore.collection("Statistics/" + userID + "/" + exerciseName).doc(currentDate).onSnapshot((res) => {


            if (res.exists) {
                result.push({currentMax: res.data().currentMax})
                //read tempData from DB
                firestore.collection("Statistics/" + userID + "/" + exerciseName).doc("tempData").onSnapshot((res) => {

                    result.push(
                        {mon: res.data().mon},
                        {tue: res.data().tue},
                        {wed: res.data().wed},
                        {thu: res.data().thu},
                        {fri: res.data().fri},
                        {sat: res.data().sat},
                        {sun: res.data().sun},
                        {currentLocalMax : res.data().currentLocalMax}
                    )

                    dispatch({ type: "READ_EXERCISE_STATS", item:result })
                })


            } else {//create empty placement for these 2 docs
                //return zeroes
                result.push({mon: 0}, {tue: 0}, {wed: 0}, {thu: 0}, {fri: 0}, {sat: 0}, {sun: 0})
                dispatch({ type: "READ_EXERCISE_STATS", item:result })
            }


        })

    }
}