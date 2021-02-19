const initState = {
    result: [
        {currentMax: 0},
        {mon: 0},
        {tue: 0},
        {wed: 0},
        {thu: 0},
        {fri: 0},
        { sat: 0},
        {sun: 0},
        {currentLocalMax: 0},
    ]
}

const StatsReducer = (state = initState, action) => {


    switch (action.type){
        case "READ_EXERCISE_STATS":
            return {
                ...state,
                stats: action.item
            }
        default:
            return state;
    }
}

export default StatsReducer