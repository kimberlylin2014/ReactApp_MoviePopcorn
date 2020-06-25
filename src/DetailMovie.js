import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./DetailMovie.css"

class DetailMovie extends Component {
    constructor(props) {
        super(props)
        this.handleGoBack = this.handleGoBack.bind(this)
    }
    handleGoBack() {
        this.props.history.push("/")
    }
    render() {
        const {movieFromMainPage : movie} = this.props.location.state;
        console.log(movie)
        return (
            <div className="DetailMovie">   
                <div className="container">
                    <h1 className='text-center'>{movie.Title}</h1>
                    <div className='d-flex justify-content-around'>
                        <div className='d-flex flex-column align-self-center'>
                            <img src={movie.Poster}></img>
                            <button className='btn btn-warning' onClick={this.handleGoBack}>Go Back </button>
                        </div>
                        <div className='d-flex flex-column align-self-center ml-5'>
                            <h5 className='mb-3'>Rated:  <br></br>{movie.Rated}</h5>
                            <h5 className='mb-3'>Director:  <br></br>{movie.Director}</h5>
                            <h5 className='mb-3'>Actors:  <br></br>{movie.Actors}</h5>
                            <h5 className='mb-3'>Awards:  <br></br> {movie.Awards}</h5>
                            <h5 className='mb-3'>Genre:  <br></br> {movie.Genre}</h5>
                            <h5 className='mb-3'>Runtime:  <br></br>{movie.Runtime}</h5>
                            <h5 className='mb-3'>Plot:  <br></br>{movie.Plot}</h5>
                            <h5 className='mb-3'>IMDB Rating: {movie.imdbRating} our of {movie.imdbVotes} votes</h5>
                        </div>
                    </div>                     
                </div>
            </div>
        )
    }
}

export default DetailMovie;