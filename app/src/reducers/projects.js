import produce from "immer"

let initialState = {
    nameProject: "Project Anonymus",
    data: [],
    settings: {},
    renderedVideo: ''
};

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "ADD_VIDEO":
            return produce(state, draftState => {
                draftState.data[action.payload.index] = {
                    video: action.payload.params.video,
                    thumb: action.payload.params.thumb,
                    date: action.payload.params.date,
                    options: {
                        fromCrop: action.payload.params.options.fromCrop,
                        toCrop: action.payload.params.options.toCrop,
                        rotate: action.payload.params.options.rotate
                    }
                }
            })
        case "SET_SETTINGS":
            return produce(state, draftState => {
                draftState.settings = action.payload
            })
        case "SET_SETTINGS_MUSIC":
            return produce(state, draftState => {
                draftState.settings.music = {
                    file: action.payload.file,
                    src: action.payload.src
                }
            })
        case "SET_RENDERED_VIDEO":
            return produce(state, draftState => {
                draftState.renderedVideo = action.payload
            })
        default:
            return state
    }
}