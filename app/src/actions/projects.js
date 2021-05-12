import axios from 'axios'
import dateformat from 'dateformat'

export function renderProject(project) {
    let requestID = Math.random().toString(36).substr(2, 5)
    
    let data = []
    project.data.map(item => {
        data.push({...item, date: dateformat(item.date, "isoDateTime").slice(0, 19).replace('T', ' ')})
    })
    project.data = data


    return dispatch => {
        dispatch({
            type: "ADD_ACTIVE_REQUEST",
            payload: { id: requestID }
        })

        axios.post(`/api/video/render`, project).then(function (response) {

            response = response.data

            dispatch({
                type: "SET_RENDERED_VIDEO",
                payload: response.renderedFile
            })

            dispatch({ 
                type: "CHANGE_SCREEN", 
                payload: "downloadScreen" 
            })
            
            dispatch({
                type: "DELETE_ACTIVE_REQUEST",
                payload: requestID
            })
        }).catch(function (error) {
            console.log(error);
        })
    }
}