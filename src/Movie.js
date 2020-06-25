import React, { Component } from 'react'
import "./Movie.css"
import {Link} from "react-router-dom"
class Movie extends Component {
    constructor(props) {
        super(props)
        this.handleVoteClick = this.handleVoteClick.bind(this);
        this.handleFavClick = this.handleFavClick.bind(this);
        this.handleShowModalClick = this.handleShowModalClick.bind(this)
    }
    handleVoteClick(e) {
        let delta;
        if(e.target.getAttribute("data-name") === "arrowUp") {
            delta = 1;
        } else if (e.target.getAttribute("data-name") === "arrowDown") {
            delta = -1;
        }
        this.props.increaseVote(this.props.id, delta)
    }
    handleFavClick() {
        this.props.addToFavList(this.props.id)
    }
    handleShowModalClick() {
        this.props.openModal(this.props.id);
    }
    render() {
        let favoriteBtnClass = "btn-info";
        let disabled = false;
        if(this.props.favorite) {
            favoriteBtnClass = "btn-warning"
            disabled = true;
        }
        return (
            <div className="Movie col-md-6 col-lg-3 mb-5">
                <img alt="movie-img" src={this.props.imgUrl}></img>
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button className={`btn mr-2 ${favoriteBtnClass}`} onClick={this.handleFavClick} disabled={disabled}>Save</button>
                    <button className="btn btn-secondary ml-2" onClick={this.handleShowModalClick}>Overview</button>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <p className="m-0">Critics: {this.props.rating} </p>
                    <div className="vote-buttons">
                        Fans:
                        <i className="fas fa-arrow-up m-0" data-name="arrowUp" onClick={this.handleVoteClick}/>
                            {this.props.votes}
                        <i className="fas fa-arrow-down m-0" data-name="arrowDown" onClick={this.handleVoteClick} />
                     </div>
                </div>
                
                        <Link exact to={{
                        pathname: `/movie/${this.props.id}`,
                        state: {movieFromMainPage: this.props.movie}
                    }}><button className='btn btn-dark'>Details Page  </button></Link>
              
               
            </div>
        )
    }
}


export default Movie;