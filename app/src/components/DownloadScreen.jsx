import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactSVG from 'react-svg'
import iconPlay from '../images/play.svg'
import Player from '../components/Player'

class DownloadScreen extends Component {
    constructor() {
        super()

        this.copyLink = this.copyLink.bind(this)
    }

    copyLink() {
        this.refs.copyText.select()
        document.execCommand("copy")
    }

    render() {
        const playerVisible = this.props.popups.player
        const project = this.props.project
        const { downloadScreen: block } = this.props.lang.language

        if(playerVisible)
            return <Player src={project.renderedVideo} />
        else
            return (
                <>
                    <div className="upload-zone bordered">
                        <button className="icon play" onClick={this.props.togglePlayer} style={{ marginBottom: "10px" }}>
                            <ReactSVG src={iconPlay} />
                        </button>
                        <h3 className="h3 white upload-zone_title">{project.nameProject}</h3>
                        <p className="description white upload-zone_descr">{block.finalText}</p>
                        <div className="in-project-videos">
                            {project.data.map((video, i) => {
                                return <div key={i} style={{ backgroundImage: `url('${video.thumb}')` }}></div>
                            })}
                        </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <button className="button grey" style={{ marginRight: "10px" }} onClick={this.copyLink}>{block.link}</button>
                        <input type="text" ref="copyText" defaultValue={`${window.location.origin}${project.renderedVideo}`} style={{ opacity: 0, position: "absolute", left: "-100%", top: "-100%" }} />
                        <a href={`${window.location.origin}${project.renderedVideo}`} className="button red" style={{ textDecoration: "none" }}>{block.download}</a>
                    </div>
                </>
            )
    }
}

DownloadScreen = connect(
    state => ({
        popups: state.popups,
        project: state.projects,
        lang: state.language
    }),
    dispatch => ({
        togglePlayer: () => dispatch({ type: "TOGGLE_PLAYER" })
    })
)(DownloadScreen)



export default DownloadScreen