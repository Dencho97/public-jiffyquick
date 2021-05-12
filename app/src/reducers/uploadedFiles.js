let initialState = [];

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "ADD_FILE":
            return [...state, action.payload]

        default:
            return state
    }
}