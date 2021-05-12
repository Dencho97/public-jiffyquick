import React, { Component } from 'react'
import { connect } from 'react-redux'

class SelectVideoScreen extends Component {
    constructor(props) {
        super(props)

        this.onSelectVideo = this.onSelectVideo.bind(this)
    }

    onSelectVideo(index) {
        this.props.changeStep({
            videoIndex: index
        })
    }

    render() {
        const files = this.props.files
        const { selectVideoScreen: block } = this.props.lang.language
        
        return (
            <div className={`upload-zone disabled`}>
                <h3 className="h3 red upload-zone_title">{block.selectVideo}</h3>
                <p className="description white upload-zone_descr">{block.hint}</p>
                <div className="upload-zone__files videos">
                    {files.length ? files.map((file, i) => {
                            return <div className={`upload-zone__files_file videos_item`} 
                                        id={`file-${i}`} 
                                        key={i}
                                        style={{ backgroundImage: `url('${file.thumb != '' ? file.thumb : ''}')` }}
                                        onClick={() => this.onSelectVideo(i)}
                                    ></div>
                    }) : null}
                </div>
            </div>
        )
    }
}


SelectVideoScreen = connect(
    state => ({
        lang: state.language
    }),
    dispatch => ({
        changeStep: (changedStep) => dispatch({
            type: "CHANGE_STEP",
            payload: {
                step: changedStep.step,
                videoIndex: changedStep.videoIndex
            }
        }),
    })
)(SelectVideoScreen)


export default SelectVideoScreen