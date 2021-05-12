import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import iconPlay from '../images/play.svg'
import iconRotate from '../images/rotate.svg'
import iconPointer from '../images/pointer.svg'
import iconReplace from '../images/replace.svg'

import moment from 'moment'

const curLang = localStorage.getItem("lang")

moment.locale(curLang === "ru" ? "ru" : "en-gb")

class Editor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toSelectVideoScreen: false,
            duration: 0,
            startTime: 0,
            endTime: 0,
            rotate: 0,
            showTimelineHint: true
        }

        this.onMouseDown = this.onMouseDown.bind(this)
        this.play = this.play.bind(this)
        this.rotate = this.rotate.bind(this)
        this.replace = this.replace.bind(this)
        this.next = this.next.bind(this)
    }

    getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }
    ucFirst(str) {
        if (!str) return str
        return str[0].toUpperCase() + str.slice(1)
    }

    onMouseDown(e) {
        let elementTimeline = this.refs.timeline
        let elemCoords = this.getCoords(elementTimeline)
        let editorCoords = this.getCoords(this.refs.editor)
        let shiftX = window.matchMedia("(max-width: 991px)").matches ? e.touches[0].pageX - elemCoords.left : e.pageX - elemCoords.left
        elementTimeline.style.cursor = "-webkit-grabbing"

        if(window.matchMedia("(max-width: 991px)").matches) // for mobile
        {
            document.ontouchmove = (e) => {
                let newLeft = e.touches[0].pageX - shiftX
                let rightEdge = editorCoords.left + this.refs.editor.offsetWidth - elementTimeline.offsetWidth

                if(newLeft > editorCoords.left)
                    newLeft = editorCoords.left
                if(newLeft < rightEdge)
                    newLeft = rightEdge
                
                elementTimeline.style.left = newLeft + 'px'
                this.swipeVideo(elementTimeline.offsetWidth-this.refs.editor.offsetWidth, Math.abs(newLeft-editorCoords.left))
            }
            document.ontouchend = () => {
                document.onmousemove = document.onmouseup = null
                elementTimeline.style.cursor = "-webkit-grab"
            }
        }
        else // for desktop
        {
            document.onmousemove = (e) => {
                let newLeft = e.pageX - shiftX
                let rightEdge = editorCoords.left + this.refs.editor.offsetWidth - elementTimeline.offsetWidth

                if(newLeft > editorCoords.left)
                    newLeft = editorCoords.left
                if(newLeft < rightEdge)
                    newLeft = rightEdge
                
                elementTimeline.style.left = newLeft + 'px'
                this.swipeVideo(elementTimeline.offsetWidth-this.refs.editor.offsetWidth, Math.abs(newLeft-editorCoords.left))
            }
            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null
                elementTimeline.style.cursor = "-webkit-grab"
            }
        }
    }
    initEditor() {
         //set coords timeline
         let editorCoords = this.getCoords(this.refs.editor)
         this.refs.timeline.style.left = editorCoords.left + "px"
 
         this.refs.editor.style.width = "100%"
         this.refs.editor.style.transform = `rotate(0deg)`

         //set duration
         this.refs.editor.addEventListener('loadedmetadata', () => {
             if(this.refs.editor !== undefined)
                this.setState({
                    duration: this.refs.editor.duration
                })
         })
         this.refs.editor.load()

         //set hints
         this.refs.hint.style.display = null
         this.refs.dashed.style.width = null


         this.setState({
            toSelectVideoScreen: false,
            startTime: 0,
            endTime: 0,
            rotate: 0,
            showTimelineHint: true
        })
    }

    swipeVideo(elemWidth, offset) {
        let startTime = Math.floor((this.state.duration * offset) / elemWidth)
        this.setState({
            startTime: startTime,
            endTime: this.state.duration == startTime ? startTime : startTime + 1
        })

        this.refs.editor.currentTime = startTime

        //hide hint
        if(offset > 0)
        {
            this.setState({ showTimelineHint: false })
            //hide hint timeline
            setTimeout(() => { 
                this.refs.hint.style.display = "none"
                this.refs.dashed.style.width = "100%"
            }, 200)
        }
        else
            this.setState({ showTimelineHint: true })
    }
    play() {
        this.refs.editor.currentTime = this.state.startTime
        this.refs.editor.play()
        setTimeout(() => {
            this.refs.editor.pause()
        }, 1200)
    }
    rotate() {
        this.setState(state => {
            const nextRotate = state.rotate + 90
            
            if(nextRotate == 90 || nextRotate == 270)
            {
                const widthEditor = this.refs.editor.offsetHeight
                this.refs.editor.style.width = `${widthEditor}px`
            }
            else
                this.refs.editor.style.width = "100%"

            this.refs.editor.style.transform = `rotate(${nextRotate}deg)`

            return {
                rotate: nextRotate == 360 ? 0 : nextRotate
            }
        })
    }
    replace() {
        let countVids = this.props.steps.steps[this.props.steps.currentStep].length
        if(countVids > 1)
        {
            this.props.changeStep({
                videoIndex: null
            })
        }
        else
        {
            this.props.changeStep({
                step: this.props.steps.currentStep-1,
                videoIndex: 0
            })
        }
    }
    next() {
        const nextStep = this.props.steps.currentStep+1 < this.props.steps.steps.length ? this.props.steps.currentStep+1 : -1
        const data = {
            video: this.props.file.src,
            thumb: this.props.file.thumb,
            date: this.props.file.file.lastModifiedDate,
            options: {
                fromCrop: this.state.startTime,
                toCrop: this.state.endTime,
                rotate: this.state.rotate
            }
        }
        this.props.addVideoInProject(data, this.props.steps.currentStep)

        if(nextStep == -1)
        {
            this.props.changeStep({
                step: nextStep
            })
        }
        else
        {
            this.props.changeStep({
                step: nextStep,
                videoIndex: this.props.steps.steps[nextStep].length == 1 ? 0 : null
            })
            this.initEditor()
        }
    }

    componentDidMount() {
        //init editor
        this.initEditor()
        //shortcarts
        window.onkeydown = (e) => {
            //play(space)
            if(e.key == " " && e.code == "Space")
            {
                e.preventDefault()
                this.play()
            }
        }
    }

    render() {
        const dateVideo = new Date(this.props.file.file.lastModified),
              dateText = this.ucFirst(moment(dateVideo).format('dddd, D MMMM, YYYY')),
              step = this.props.steps.currentStep
        const { language, short } = this.props.lang
        const { editor: block } = language

        return (
            <div className={`editor`}>
                <div className="editor__timeline" ref="timeline" onMouseDown={this.onMouseDown} onTouchStart={this.onMouseDown}>
                    <div className={`editor__timeline__hint ${!this.state.showTimelineHint ? "hide" : ""}`} ref="hint">
                        <img src={iconPointer} className="editor__timeline__hint_icon"/>
                        <p className="editor__timeline__hint_text">{block.hintMove}</p>
                    </div>
                    <div className="editor__timeline_dashed" ref="dashed"></div>
                </div>
                <div className="editor_video-wrapper">
                    <button className="icon play" onClick={this.play}>
                        <ReactSVG src={iconPlay} />
                    </button>
                    <button className="icon rotate" onClick={this.rotate}>
                        <ReactSVG src={iconRotate} />
                    </button>
                    <video src={this.props.file.src} 
                        className="editor_video" 
                        ref="editor" 
                        poster={this.props.file.thumb} 
                    ></video>
                    <div className="date">{dateText}</div>
                    {step > 0 ? 
                        <button className="icon replace" onClick={this.replace}>
                            <ReactSVG src={iconReplace} />
                        </button>
                    : null}
                </div>
                <button className="button red next" onClick={this.next}>{block.okey}</button>
            </div>
        )
    }
}

Editor = connect(
    state => ({
        project: state.projects,
        steps: state.steps,
        lang: state.language
    }),
    dispatch => ({
        addVideoInProject: (params, index) => dispatch({
            type: "ADD_VIDEO",
            payload: {
                index: index,
                params: params
            }
        }),
        changeStep: (changedStep) => dispatch({
            type: "CHANGE_STEP",
            payload: {
                step: changedStep.step,
                videoIndex: changedStep.videoIndex
            }
        }),
    })
)(Editor)

export default Editor