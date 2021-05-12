import lang from '../lang'

let userLang = localStorage.getItem("lang")

let initialState = {
    language: lang[userLang],
    short: userLang
};

export default function reducer(state = initialState, action) {
    switch(action.type)
    {
        case "SWITCH_LANG":
            const curLang = localStorage.getItem("lang")
            const nextLang = curLang === "ru" ? "en" : "ru"
            localStorage.setItem("lang", nextLang)

            return { ...state, language: lang[nextLang], short: nextLang }
        default:
            return state
    }
}