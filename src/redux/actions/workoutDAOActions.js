
export const getExercises =(passId)=>{
    return (dispatch, getState, { getFirebase ,getFirestore}) => {
const firestore = getFirestore();
let result=[];
firestore.collection("Sessions/"+passId+"/Exercises").get().then((querySnapshot) => {
     
    querySnapshot.forEach((doc) => {
         result= [{title:doc.data().title, id:doc.id, weight:doc.data().weight,reps:doc.data().reps,sets:doc.data().sets},...result]
     
    });
    console.log(result)
    dispatch({type:"Get_Exercises",item:result})
})
    }
}