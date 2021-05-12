import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { uploadMusic } from '../actions/upload'
import { renderProject } from '../actions/projects'

class SettingsScreen extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            title: '',
            subtitle: '',
            date_show: true,
            logo_show: true,
            photo_show: true,
            music: null
        }

        this.onDrop = this.onDrop.bind(this)
        this.onChange = this.onChange.bind(this)
        this.nextScreen = this.nextScreen.bind(this)
    }
    onDrop(file) {
        this.props.actionUploadMusic(file[0])
        
        this.setState({
            music: file[0]
        })
    }
    onChange(e) {
        const name = e.target.name,
              value = e.target.value,
              type = e.target.type

        this.setState(state => {
            return {
                [name]: type == "checkbox" ? !state[name] : value
            }
        })
    }
    nextScreen(e) {
        e.preventDefault()
        this.props.setSettings({
            title: this.state.title,
            subtitle: this.state.subtitle,
            date_show: this.state.date_show,
            logo_show: this.state.logo_show,
            photo_show: this.state.photo_show,
            music: typeof this.props.project.settings['music'] !== "undefined" ? this.props.project.settings.music : this.state.music
        })

        this.props.actionRenderProject({...this.props.project, 
            settings: {
                title: this.state.title,
                subtitle: this.state.subtitle,
                date_show: this.state.date_show,
                logo_show: this.state.logo_show,
                music: typeof this.props.project.settings['music'] !== "undefined" ? this.props.project.settings.music : this.state.music
            },
            deleteFiles: this.props.uploadedFiles.filter(uploadFile => {
                return !this.props.project.data.filter(file => {
                    return file.video == uploadFile.src
                }).length
            })
        })

        this.props.changeScreen("renderingScreen")
    }

    componentDidMount() {
        window.onkeydown = () => (true)
    }
    render() {
        let isLoadedMusic = this.props.activeRequests.requests.length ? true : false
        const { settingsScreen: block } = this.props.lang.language

        return (
            <form className={`settings`}>
                <div className="input">
                    <label htmlFor="title">{block.title}</label>
                    <input type="text" name="title" id="title" placeholder={block.titlePlaceholder} value={this.state.title} onChange={this.onChange} />
                </div>
                <div className="input">
                    <label htmlFor="subtitle">{block.subtitle}</label>
                    <input type="text" name="subtitle" id="subtitle" placeholder={block.subtitlePlaceholder} value={this.state.subtitle} onChange={this.onChange} />
                </div>
                <div className="swipe-checkbox">
                    <input type="checkbox" name="date_show" id="date_show" onChange={this.onChange} checked={this.state.date_show} hidden />
                    <label htmlFor="date_show">
                        {block.date}
                        <span className="swipe"></span>
                    </label>
                </div>
                <div className="swipe-checkbox">
                    <input type="checkbox" name="logo_show" id="logo_show" onChange={this.onChange} checked={this.state.logo_show} hidden />
                    <label htmlFor="logo_show">
                        {block.logo}
                        <span className="swipe"></span>
                    </label>
                </div>
                <Dropzone onDrop={file => this.onDrop(file)} multiple={false} accept="audio/*" >
                    {({getRootProps, getInputProps, isDragActive}) => (
                        <div className="input-music">
                            <label htmlFor="music">{block.music}</label>
                            <div className="upload-zone-music" {...getRootProps()} style={{ borderColor: isDragActive ? "#EC2A2A" : "#222222" }}>
                                <p className="upload-zone-music_title">{this.state.music ? this.state.music.name : block.addMusic}</p>
                                <p className="upload-zone-music_subtitle">{block.dropFile}</p>
                                <input {...getInputProps()} name="music" id="music" />
                            </div>
                        </div>
                    )}
                </Dropzone>
                <button className="button red" onClick={this.nextScreen} disabled={isLoadedMusic}>{isLoadedMusic ? block.loading : block.okey}</button>
            </form>
        )
    }
}

SettingsScreen = connect(
    state => ({
        activeRequests: state.activeRequests,
        project: state.projects,
        uploadedFiles: state.uploadedFiles,
        lang: state.language
    }),
    dispatch => ({
        setSettings: (settings) => dispatch({ type: "SET_SETTINGS", payload: settings }),
        actionUploadMusic: (music) => dispatch(uploadMusic(music)),
        actionRenderProject: (project) => dispatch(renderProject(project)),
        changeScreen: (screen) => dispatch({ type: "CHANGE_SCREEN", payload: screen })
    })
)(SettingsScreen)

export default SettingsScreen