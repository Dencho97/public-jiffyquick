import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Logo from '../components/Logo'
import { StartText, Slider } from '../components/StartScreen'

import Wrapper from '../components/Wrapper'
import UploadScreen from '../components/UploadScreen'
import EditorScreen from '../components/EditorScreen'
import AddingVideosScreen from '../components/AddingVideosScreen'
import SettingsScreen from '../components/SettingsScreen'
import DownloadScreen from '../components/DownloadScreen'
import Waiting from '../components/Waiting'
import StatusBar from '../components/StatusBar'

class Main extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            timeout: null
        }

        this.nextScreen = this.nextScreen.bind(this)

        props.changeScreen("startSiderScreen")
    }

    getScreen() {
        const screen = this.props.screen.screen
        const { renderingScreen: block } = this.props.lang.language

        switch(screen) {
            case "startSiderScreen":
                return (
                    <Fragment>
                        <Logo />
                        <div onClick={this.nextScreen}>
                            <StartText />
                            <Slider />
                        </div>
                    </Fragment>
                )
            case "uploadScreen":
                return (
                    <Fragment> 
                        <Logo />
                        <div>
                            <UploadScreen />
                        </div>
                    </Fragment>
                )
            case "editorScreen":
                return (
                    <Fragment> 
                        <Logo />
                        <div>
                            <EditorScreen />
                        </div>
                        <StatusBar />
                    </Fragment>
                )
            case "addingVideosScreen":
                return (
                    <Fragment> 
                        <Logo />
                        <div>
                            <AddingVideosScreen />
                        </div>
                    </Fragment>
                )
            case "settingsScreen":
                return (
                    <Fragment> 
                        <Logo />
                        <div>
                            <SettingsScreen />
                        </div>
                    </Fragment>
                )
            case "renderingScreen":
                return (
                    <Fragment> 
                        <Logo />
                        <div>
                            <Waiting />
                            <h2 className="h2 white" style={{margin: "15px 0 0 0"}}>{block.save}</h2>
                        </div>
                    </Fragment>
                )
            case "downloadScreen":
                return (
                    <Fragment> 
                        <Logo />
                        <DownloadScreen />
                    </Fragment>
                )
            case "":
                return null
        }
    }

    nextScreen() {
        /*
        if(this.state.timeout)
        {            
            clearTimeout(this.state.timeout)
        }
        */

        this.props.changeScreen("uploadScreen")
    }

    componentDidMount() {
        /*
        let timeout = setTimeout(() => this.nextScreen(), 10000)
        this.setState({
            timeout: timeout
        })
        */
    }

    render() {    
        return (
            <Wrapper>
                <section id="Main" className="main">
                    {this.getScreen()}
                </section>
            </Wrapper>
        )
    }
}

Main = connect(
    state => ({
        screen: state.constructorNavigator,
        lang: state.language
    }),
    dispatch => ({
        changeScreen: (screen) => dispatch({ type: "CHANGE_SCREEN", payload: screen })
    })
)(Main)

export default Main