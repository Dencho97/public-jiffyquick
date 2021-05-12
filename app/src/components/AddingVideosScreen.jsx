import React, { Component } from 'react'
import { connect } from 'react-redux'

import iconDnd from '../images/dnd.svg'

class AddingVideosScreen extends Component {
    constructor(props) {
        super(props)

        this.nextScreen = this.nextScreen.bind(this)
    }

    nextScreen() {
        this.props.changeScreen("settingsScreen")
    }

    render() {
        const project = this.props.project.data

        return (
            <div>
                <div className="upload-zone bordered">
                    <h3 className="h3 red upload-zone_title">Сохранить или добавить еще</h3>
                    <p className="description white upload-zone_descr">Готово 4 месяца выдео, на 2 минуты и 16 секунд, схораняй или перетаскивай еще видео</p>
                    <img src={iconDnd} className="upload-zone_icon" alt="drop files" />
                    <div className="in-project-videos">
                        {project.map((video, i) => {
                            return <div key={i} style={{ backgroundImage: `url('${video.thumb}')` }}></div>
                        })}
                    </div>
                </div>
                <button className="button red next" onClick={this.nextScreen}>Сохранить проект</button>
            </div>
        )
    }
}

AddingVideosScreen = connect(
    state => ({
        steps: state.steps,
        project: state.projects
    }),
    dispatch => ({
        changeScreen: (screen) => dispatch({ type: "CHANGE_SCREEN", payload: screen })
    })
)(AddingVideosScreen)

export default AddingVideosScreen