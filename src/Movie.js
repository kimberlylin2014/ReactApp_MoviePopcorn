import React, { Component } from 'react'
import "./Movie.css"


class Movie extends Component {
    // static defaultProps = {
    //     votes: 0
    // }
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
        console.log("clicked fav");
        this.props.addToFavList(this.props.id)
    }
    handleShowModalClick() {
        this.props.openModal(this.props.id);
    }
    render() {
        return (
            <div className="Movie col-md-6 col-lg-3 mb-5">
                <img alt="movie-img" src={this.props.imgUrl}></img>
                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button className="btn btn-info mr-2" onClick={this.handleFavClick}>Save</button>
                    <button className="btn btn-secondary ml-2" onClick={this.handleShowModalClick}>More</button>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                    <p className="m-0">Critics: {this.props.rating} %</p>
                    <div className="vote-buttons">
                        Fans:
                        <i className="fas fa-arrow-up m-0" data-name="arrowUp" onClick={this.handleVoteClick}/>
                            {this.props.votes}
                        <i className="fas fa-arrow-down m-0" data-name="arrowDown" onClick={this.handleVoteClick} />
                     </div>
                </div>
               
                
                


            </div>
        )
    }
}


export default Movie;