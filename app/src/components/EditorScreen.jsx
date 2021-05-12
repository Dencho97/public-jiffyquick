import React, { Component } from 'react'
import { connect } from 'react-redux'

import SelectVideoScreen from './SelectVideoScreen'
import Editor from './Editor'
import Waiting from './Waiting'

class EditorScreen extends Component {
    constructor(props) {
        super(props)

        this.nextScreen = this.nextScreen.bind(this)
    }

    checkLoadedFiles(step) {
        let filesIsLoading = this.props.steps.steps[step].filter(file => file.loaded != 1)
        if(filesIsLoading.length)
            return false
        else
            return true
    }
    nextScreen() {
        this.props.changeScreen("settingsScreen")
    }

    render() {
        if(this.props.steps.currentStep != -1)
        {
            let videos = this.props.steps.steps[this.props.steps.currentStep],
                selected = this.props.steps.selectedVideoIndex,
                isLoaded = this.checkLoadedFiles(this.props.steps.currentStep)
            if(!isLoaded)
            {
                return <Waiting isLoaded={isLoaded} />
            }

            else if(selected == null)
                return <SelectVideoScreen files={videos} />
            else
                return <Editor file={videos[selected]} />
        }
        
        else
            return null
    }

    componentWillUpdate(props, state) {
        if(props.steps.currentStep == -1)
            this.nextScreen()
    }
}

EditorScreen = connect(
    state => ({
        steps: state.steps,
        project: state.projects
    }),
    dispatch => ({
        changeScreen: (screen) => dispatch({ type: "CHANGE_SCREEN", payload: screen })
    })
)(EditorScreen)

export default EditorScreen