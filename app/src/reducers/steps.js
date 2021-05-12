import produce from "immer"

let initialState = {
    steps: 0,
    currentStep: -1,
    selectedVideoIndex: null
};

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "SET_STEPS":
            return {
                steps: action.payload.steps,
                currentStep: 0,
                selectedVideoIndex: action.payload.startVideoIndex 
            }
        case "CHANGE_STEP":
            return produce(state, draftState => {
                draftState.currentStep = action.payload.step !== undefined ? action.payload.step : state.currentStep
                draftState.selectedVideoIndex = action.payload.videoIndex !== undefined ? action.payload.videoIndex : state.selectedVideoIndex
            })
        case "UPLOAD_PROGRESS_FILE_STEP":
            return produce(state, draftState => {
                draftState.steps[action.payload.step][action.payload.fileIndex].progress = action.payload.progress
            })
        case "UPLOAD_SUCCSESS_FILE_STEP":
            return produce(state, draftState => {
                draftState.steps[action.payload.step][action.payload.fileIndex].loaded = true
                draftState.steps[action.payload.step][action.payload.fileIndex].thumb = action.payload.thumb
                draftState.steps[action.payload.step][action.payload.fileIndex].src = action.payload.src
            })
        case "SET_PROGRESS_FILE_STEP":
            return produce(state, draftState => {
                draftState.steps[action.payload.step][action.payload.fileIndex].indicatorCircle = action.payload.indicatorCircle
            })

        default:
            return state
    }
}