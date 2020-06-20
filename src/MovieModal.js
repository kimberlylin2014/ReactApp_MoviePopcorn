import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
import "./MovieModal.css";

class MovieModal extends Component {
    constructor(props) {
        super(props)
        this.handleOnHide = this.handleOnHide.bind(this)
    }
    handleOnHide() {
        this.props.onHide();
    }
    render() {
        return (
            <div >
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="Modal"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <div className="container">
                               <h1> {this.props.movie.Title}</h1>
                            </div>
                       
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="container">
                        <p><span className="subtitle">Year Released:</span> {this.props.movie.Year}</p>
                        <p><span className="subtitle">Rated:</span>  {this.props.movie.Rated}</p>
                        <p><span className="subtitle">Director:</span> {this.props.movie.Director}</p>
                        <p><span className="subtitle">Actors:</span> {this.props.movie.Actors}</p>
                        <p><span className="subtitle">Plot:</span> {this.props.movie.Plot}</p>
                   
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={this.handleOnHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MovieModal;
