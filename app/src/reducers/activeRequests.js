let initialState = {
    requests: []
};

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "ADD_ACTIVE_REQUEST":
            return {
                ...state,
                requests: [...state.requests, action.payload]
            }
        case "DELETE_ACTIVE_REQUEST":
            return {
                ...state,
                requests: state.requests.filter(request => request.id != action.payload)
            }
        default:
            return state
    }
}