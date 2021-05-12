import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'

import iconBurger from '../images/burger.svg'

class Wrapper extends Component {
    constructor() {
        super()

        this.state = {
            menuIsOpen: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
        this.switchLanguage = this.switchLanguage.bind(this)
    }

    toggleMenu() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen })
    }
    switchLanguage() {
        const { dispatch } = this.props
        dispatch({ type: "SWITCH_LANG" })
    }

    render() {
        let { short, language } = this.props.lang
        const { menu } = language
        short = short === "ru" ? "EN" : "RU"

        return (
            <div id="wrapper">
                <button className="lang" onClick={this.switchLanguage}>{short}</button>
                <button className={`icon burger ${this.state.menuIsOpen ? "active" : ''}`} onClick={this.toggleMenu}>
                    <ReactSVG src={iconBurger} />
                </button>
                <ul className="main-menu" style={{ display: this.state.menuIsOpen ? "block" : "none" }}>
                    <li><Link to="/about">{menu.about}</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    lang: state.language
})

export default connect(mapStateToProps)(Wrapper)