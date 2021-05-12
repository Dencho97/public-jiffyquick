import produce from "immer"

let initialState = {
    player: false
};

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "TOGGLE_PLAYER":
            return produce(state, draftState => {
                draftState.player = !draftState.player
            })

        default:
            return state
    }
}