export const setLoggedInState = (state = false, action ) => {

    switch (action.type){

        case 'SIGNED_IN':
            return {
                status: !state
            };
        default:

            return state
    }

}
