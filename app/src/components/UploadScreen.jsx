import React, { Component } from 'react'
import { connect } from 'react-redux'
import iconDnd from '../images/dnd.svg'
import Dropzone from 'react-dropzone'
import { Circle } from 'progressbar.js'

import { uploadFiles } from '../actions/upload'

class LoadingFiles extends Component {
    constructor(props) {
        super(props)

        this.updateProgress = this.updateProgress.bind(this)
    }
    updateProgress() {
        let steps = this.props.steps.steps
        if(steps.length)
        {
            steps.map((files, i) => {
                return files.map((file, j) => {
                    if(file.indicatorCircle == null)
                    {
                        let indicatorCircle = new Circle(`#file-${i}${j}`, {
                            strokeWidth: 2,
                            color: '#EC2A2A',
                            trailWidth: false,
                            svgStyle: null
                        })

                        this.props.setIndicatorCircle(indicatorCircle, i, j)
                        indicatorCircle.set(0.01)
                    }
                    else
                        file.indicatorCircle.set((file.progress/100).toFixed(2))
                })
            })
        }
    }

    render() {
        let steps = this.props.steps.steps
        return (
            <div className="upload-zone__files">
                {steps.length ? steps.map((files, i) => {
                    return files.map((file, j) => {
                            return <div className={`upload-zone__files_file ${file.loaded ? "uploaded" : ""}`} 
                                        id={`file-${i}${j}`} 
                                        key={j}
                                        style={{ backgroundImage: `url('${file.thumb != '' ? file.thumb : ''}')` }}
                                        ></div>
                    })
                }) : null}
            </div>
        )
    }
    componentDidMount() {
        this.updateProgress()
    }
    componentDidUpdate() {
        this.updateProgress()
    }
}

class UploadScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEmpty: true,
            disabledDropzone: false
        }

        this.onDrop = this.onDrop.bind(this)
    }

    filterFiles(files) {
        files.sort((a,b) => {
            if(a.lastModified > b.lastModified)
                return 1
            if(a.lastModified < b.lastModified)
                return -1
            return 0;
        })

        return files
    }
    buildSteps(files) {
        let steps = []
        let dates = []
        files.forEach((file) => {
            let fileDate = new Date(file.lastModified)
            if(dates.length == 0)
                dates.push(fileDate)
            else
            {
                let dublicates = dates.filter((date) => {
                    if
                    (
                        date.getDate() == fileDate.getDate() && 
                        date.getMonth() == fileDate.getMonth() && 
                        date.getFullYear() == fileDate.getFullYear()
                    ) return date
                })

                if(dublicates.length == 0)
                    dates.push(fileDate)
            }
        })

        dates.forEach((date) => {
            let groupFilesByDate = files.filter((file) => {
                let fileDate = new Date(file.lastModified)
                if
                (
                    date.getDate() == fileDate.getDate() && 
                    date.getMonth() == fileDate.getMonth() && 
                    date.getFullYear() == fileDate.getFullYear()
                ) return date
            })
            groupFilesByDate.forEach((file, i) => {
                groupFilesByDate[i] = {
                    file: file,
                    loaded: false,
                    progress: 0,
                    indicatorCircle: null,
                    thumb: '',
                    src: ''
                }
            })

            steps.push(groupFilesByDate)
        })

        this.props.setSteps(steps)
    }

    onDrop(files) {
        if(files.length)
        {
            let sortFiles = this.filterFiles(files)
            this.buildSteps(sortFiles)
            this.props.actionUploadFiles(this.props.steps.steps)

            this.setState({
                isEmpty: false,
                disabledDropzone: true
            })
        }
        else
            alert("Нет файлов")
    }
    checkLoadedFiles(step) {
        let filesIsLoading = this.props.steps.steps[step].filter(file => file.loaded != 1)
        if(filesIsLoading.length)
            return false
        else
            return true
    }
    
    nextScreen() {
        this.props.changeScreen("editorScreen")
    }


    render() {
        const { uploadScreen: block } = this.props.lang.language
        return (
            <Dropzone onDrop={files => this.onDrop(files)} disabled={this.state.disabledDropzone} accept="video/*">
                {({getRootProps, getInputProps, isDragActive}) => (
                    <div className={`upload-zone ${this.state.disabledDropzone ? "bordered" : ''}`} {...getRootProps()} style={{ borderColor: isDragActive ? "#EC2A2A" : "#222222" }}>
                        <h3 className="h3 red upload-zone_title">{this.state.isEmpty ? block.addVideo : block.uploading}</h3>
                        <p className="description white upload-zone_descr">{this.state.isEmpty ? block.dropFiles : block.firstDayVideo}</p>
                        {this.state.isEmpty ? <img src={iconDnd} className="upload-zone_icon" alt="drop files" /> : null}
                        <input {...getInputProps()} />
                        {!this.state.isEmpty ? <LoadingFiles /> : null}
                    </div>
                )}
            </Dropzone>
        )
    }

    componentDidUpdate() {
        // if all files uploads to next screen
        if(this.props.steps.currentStep != -1)
        {
            const isLoaded = this.checkLoadedFiles(this.props.steps.currentStep)
            if(isLoaded && !this.state.toEditorScreen)
            {
                this.nextScreen()
            }
        }
    }
    
}

LoadingFiles = connect(
    state => ({
        activeRequests: state.activeRequests,
        steps: state.steps
    }),
    dispatch => ({
        setIndicatorCircle: (indicatorCircle, step, fileIndex) => dispatch({
            type: "SET_PROGRESS_FILE_STEP",
            payload: { indicatorCircle: indicatorCircle, step: step, fileIndex: fileIndex }
        })
    })
)(LoadingFiles)

UploadScreen = connect(
    state => ({
        activeRequests: state.activeRequests,
        steps: state.steps,
        lang: state.language
    }),
    dispatch => ({
        actionUploadFiles: (files) => dispatch(uploadFiles(files)),
        setSteps: (steps) => dispatch({
            type: "SET_STEPS",
            payload: {
                steps: steps,
                startVideoIndex: steps[0].length == 1 ? 0 : null
            }
        }),
        changeScreen: (screen) => dispatch({ type: "CHANGE_SCREEN", payload: screen })
    })
)(UploadScreen)

export default UploadScreen