const initState = [];
const scheduleReducers  = (state = initState, action) => {
    switch (action.type){
        case 'ADD_SCHEDULE':
            return Array.isArray(action.schedule) ? [...state, ...action.schedule] : [...state, action.schedule];
        // case 'REMOVE_SCHEDULE':
        //     return [...state.filter((schedule) => schedule.id !== action.scheduleID)];
        default:
            return state;
    }
}
export default scheduleReducers
