import React, { Component } from 'react'
import './App.css';
import MoviePage from "./MoviePage"
import {Switch, Route} from "react-router-dom"
import DetailMovie from "./DetailMovie"

class App extends Component {
  render() {
    return(
        <div >
          <div className="justify-content-center">
            <Switch>
              <Route exact path='/' component={MoviePage}/>
              <Route exact path='/movie/:id' render={(routerProps) => <DetailMovie {...routerProps}/>}/>
            </Switch>
          </div>
        </div>
    )
  }
}

export default App;
