const initState = {

    result: [
        {currentMax: 1},
        {mon: 1},
        {tue: 1},
        {wed: 1},
        {thu: 1},
        {fri: 1},
        {sat: 1},
        {sun: 1},
        {currentLocalMax: 1},
    ]

}

const StatsReducer = (state = initState, action) => {


    switch (action.type){
        case "READ_EXERCISE_STATS":
            return {
                ...state,
                result:action.item
            }

        default:
            return {...state}
    }
}

export default StatsReducer