import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <Link to="/"><img src={logo} className="main_logo" alt="jiffyquick"/></Link>
            </div>
        )
    }
}

export default Logo