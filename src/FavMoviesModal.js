import React, { Component } from 'react'
import {Modal, Button} from "react-bootstrap"

class FavMoviesModal extends Component {
    constructor(props) {
        super(props)
        this.handleOnHide = this.handleOnHide.bind(this)
        this.handleRemoveFavMovie = this.handleRemoveFavMovie.bind(this)
    }
    handleOnHide() {
        this.props.onHide();
    }
    handleRemoveFavMovie(e) {
        let id = e.target.getAttribute("data-id");
        this.props.removeFavorite(id)
    }
    render() {
        let list;
        if(this.props.favorites.length === 0) {
            list = "You Have Not Added Anything to This List"
        } else {
            list = 
                this.props.favorites.map(movie => {
                    return <li className="mb-3" key={movie.imdbID}>{movie.Title}<button onClick={this.handleRemoveFavMovie} className="btn btn-light float-right" data-id={movie.imdbID}>Remove</button></li>
                })  
        }
        return (
            <div >
            <Modal
                show = {this.props.show}
                onHide = {this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="Modal"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="container">
                           <h1> My Favorites</h1>
                        </div>
                   
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                    {list}
               
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={this.handleOnHide}>Close</button>
                    {/* <Button variant="info" onClick={this.handleOnHide}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}

export default FavMoviesModal;