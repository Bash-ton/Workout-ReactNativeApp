const data = 	[{title: 'Bench', id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', reps:'14', weight: '80kg'},
      {title: 'PullDown',reps:'14', id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', weight: '80kg'},
      {title: 'Squats',reps:'14', id: '58694a0f-3da1-471f-bd96-145571e29d72', weight: '80kg'}];
export const workoutDAOReducer = (state = data, action ) => {

    switch (action.type){

        case 'Get_Exercises':
            return {
                exercises: action.item
            };
        default:
            return state
    }

}
