import React, { Component } from 'react'
import { connect } from 'react-redux'

class StatusBar extends Component {
    render() {
        let countSteps = this.props.steps.steps.length,
            currentStep = this.props.steps.currentStep
        const { statusBar: block } = this.props.lang.language
            
        return (
            <div className="status-bar fadeIn">
                <div className="status-bar_fill" style={{ width: currentStep != -1 ? `${Math.round(currentStep/countSteps*100)}%` : "100%" }}>
                    <span className="status-bar_text description grey">{currentStep != -1 ? currentStep : countSteps} {block.of} {countSteps}</span>
                </div>
            </div>
        )
    }
}

StatusBar = connect(
    state => ({
        steps: state.steps,
        lang: state.language
    })
)(StatusBar)

export default StatusBar