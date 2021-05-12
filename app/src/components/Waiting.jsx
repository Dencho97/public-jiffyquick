import React, { Component } from 'react'
import loading from '../images/loading.svg'

class Waiting extends Component {
    render() {
        return (
            <div className={`loading`}>
                <img src={loading} alt="loading..."/>
            </div>
        )
    }
}

export default Waiting