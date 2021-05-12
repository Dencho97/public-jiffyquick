import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import uuid from 'uuid'

import Main from './pages/Main'
import About from './pages/About'
import NotFound from './pages/NotFound'

class App extends Component {

    componentWillMount() {
        let id = localStorage.getItem("id"),
            lang = localStorage.getItem("lang")

        if(id === null) 
        {
            let anonymID = uuid()
            localStorage.setItem("id", anonymID)
        }
        if(lang === null)
        {
            localStorage.setItem("lang", "ru")
        }

    }
    
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/about" exact component={About} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;