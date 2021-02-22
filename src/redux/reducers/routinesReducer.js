const initState = [];
export const routineReducers  = (state = initState, action) => {
    switch (action.type){
        case 'ADD_ROUTINE':
            return Array.isArray(action.schedule) ? [...state, ...action.routine] : [...state, action.routine];
        default:
            return state;
    }
}

export const exerciseReducers  = (state = null, action) => {
    switch (action.type){
        case 'ADD_EXERCISE':
            return "success";
        default:
            return state;
    }
}