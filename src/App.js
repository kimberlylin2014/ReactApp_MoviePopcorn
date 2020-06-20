import React, { Component } from 'react'
import './App.css';
import MoviePage from "./MoviePage"

class App extends Component {
  render() {
    return(
        <div >
          <div className="justify-content-center">
            <MoviePage />
          </div>
        </div>
    )
  }
}

export default App;
