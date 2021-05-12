import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'

import Waiting from '../components/Waiting'
import iconPlay from '../images/play-big.svg'
import iconPause from '../images/pause-big.svg'
import iconClose from '../images/close.svg'

class Player extends Component {
    constructor() {
        super()

        this.state = {
            loaded: false,
            playing: false,
            duration: 0,
            curTime: 0
        }

        this.togglePlay = this.togglePlay.bind(this)
        this.changeTime = this.changeTime.bind(this)
    }

    toMMSS(sec) {
        let sec_num = Math.round(parseInt(sec, 10))
        let hours   = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        let seconds = sec_num - (hours * 3600) - (minutes * 60)
    
        if (minutes < 10) { minutes = "0"+minutes }
        if (seconds < 10) { seconds = "0"+seconds }
        return minutes+':'+seconds
    }
    togglePlay() {
        this.state.playing ? this.refs.player.pause() : this.refs.player.play()
        this.setState({ playing: !this.state.playing })
    }
    changeTime(e) {
        let rect = this.refs.timeline.getBoundingClientRect(),
            width = this.refs.timeline.offsetWidth,
            x = e.clientX - rect.left,
            pixelsOnSecond = width/this.state.duration,
            curTime = x/pixelsOnSecond
        
        this.setState({ curTime })
        this.refs.player.currentTime = curTime
    }

    componentDidMount() {
        this.refs.player.volume = 1
        this.refs.player.oncanplay = () => {
            this.setState({ loaded: true })
        }
        this.refs.player.ontimeupdate = () => {
            let curTime = this.refs.player.currentTime,
                newState = { curTime }

            if(Math.round(curTime) == this.state.duration)
                newState = {...newState, playing: false, curTime: Math.round(curTime)}
                
            this.setState(newState)
        }
        window.onkeydown = (e) => {
            //play(space)
            if(e.key == " " && e.code == "Space")
            {
                e.preventDefault()
                this.togglePlay()
            }
        }
    }
    render() {
        return (
            <div className="player">
                <video src={this.props.src} className="player_video" ref="player" />
                <button className="icon close transparent player_close" style={{ display: this.state.loaded ? "block" : "none" }} onClick={this.props.togglePlayer}><ReactSVG src={iconClose} /></button>
                <div className="player__controls" style={{ display: this.state.loaded ? "flex" : "none" }}>
                    <span className="player__controls_time current">{this.toMMSS(this.state.curTime)}</span>
                    <button className="icon play big transparent player__controls_play" onClick={this.togglePlay}>
                        <ReactSVG src={this.state.playing ? iconPause : iconPlay} />
                    </button>
                    <span className="player__controls_time final">{this.toMMSS(this.state.duration)}</span>
                </div>
                <div className="status-bar player_timeline" ref="timeline" style={{ display: this.state.loaded ? "block" : "none" }} onClick={this.changeTime}>
                    <div className="status-bar_fill" style={{ width: `${this.state.curTime/this.state.duration*100}%`, transition: "none" }}></div>
                </div>
                {!this.state.loaded && <div className="player_loading"><Waiting /></div>}
            </div>
        )
    }

    componentWillUpdate(props, state) {
        if(state.loaded) {
            state.duration = Math.round(this.refs.player.duration)
        }
    }
}

Player = connect(
    null,
    dispatch => ({
        togglePlayer: () => dispatch({ type: "TOGGLE_PLAYER" })
    })
)(Player)

export default Player