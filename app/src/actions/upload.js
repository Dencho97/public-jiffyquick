import axios from 'axios'

function recursiveUpload(iterator, steps, dispatch) {
    if(iterator < steps.length)
    {
        let loadedFiles = 0
        steps[iterator].forEach((item, i) => {

            let requestID = Math.random().toString(36).substr(2, 5)
            dispatch({
                type: "ADD_ACTIVE_REQUEST",
                payload: { id: requestID }
            })
            
            let file = item.file

            let formData = new FormData()
            formData.append(`file-${iterator}${i}--${localStorage.getItem("id")}`, file)
            formData.append("lastModified", file.lastModified)
            formData.append("anonym", localStorage.getItem("id"))
            formData.append("file-type", "video")

            axios.post('/api/files/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function( progressEvent ) {
                        let uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )
                        dispatch({
                            type: "UPLOAD_PROGRESS_FILE_STEP",
                            payload: { step: iterator, fileIndex: i, progress: uploadPercentage }
                        })
                    }.bind(this)
                }
            ).then(function(responce) {
                if(!responce.data.error)
                {
                    console.log(1)
                    dispatch({
                        type: "UPLOAD_SUCCSESS_FILE_STEP",
                        payload: { step: iterator, fileIndex: i, thumb: responce.data.data.thumb, src: responce.data.data.src}
                    })
                    dispatch({
                        type: "ADD_FILE",
                        payload: { src: responce.data.data.src }
                    })

                    loadedFiles++
                    if(loadedFiles == steps[iterator].length)
                    {
                        loadedFiles = 0
                        recursiveUpload(iterator+1, steps, dispatch)
                    }
                }

                dispatch({
                    type: "DELETE_ACTIVE_REQUEST",
                    payload: requestID
                })

            })
            .catch(function(){
                dispatch({
                    type: "DELETE_ACTIVE_REQUEST",
                    payload: requestID
                })
                
                console.error(`Ошибка закгрузки файла ${file.name}`)
            });
        })

    }

    return;
}

export function uploadFiles(steps) {
    return dispatch => {
        recursiveUpload(0, steps, dispatch)
    }
}

export function uploadMusic(file) {
    return dispatch => {

        let requestID = Math.random().toString(36).substr(2, 5)
        dispatch({
            type: "ADD_ACTIVE_REQUEST",
            payload: { id: requestID }
        })
        

        let formData = new FormData()
        formData.append(`file-0--${localStorage.getItem("id")}`, file)
        formData.append("lastModified", file.lastModified)
        formData.append("anonym", localStorage.getItem("id"))
        formData.append("file-type", "music")

        axios.post('/api/files/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function(responce) {
            if(!responce.data.error)
            {
                dispatch({
                    type: "SET_SETTINGS_MUSIC",
                    payload: { file: file, src: responce.data.data.src }
                })
            }

            dispatch({
                type: "DELETE_ACTIVE_REQUEST",
                payload: requestID
            })

        })
        .catch(function(){
            dispatch({
                type: "DELETE_ACTIVE_REQUEST",
                payload: requestID
            })
            
            console.error(`Ошибка закгрузки файла ${file.name}`)
        })
    }
}