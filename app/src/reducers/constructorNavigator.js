let initialState = {
    screen: ''
};

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "CHANGE_SCREEN":
            return {...state, screen: action.payload}

        default:
            return state
    }
}