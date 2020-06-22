import React, { Component } from 'react';
import {Nav, NavDropdown, Navbar, Container} from "react-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    handleFavoriteClick() {
        this.props.openFavModal();
    }
    handleSort(e) {
        let sortType = e.target.getAttribute("data-name")
        this.props.sortDisplayResult(sortType)

    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" >
                <Container>
                <Navbar.Brand href="#home">Popcorn Movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                       
                        <Nav.Link href="#features" onClick={this.handleFavoriteClick}>Favorites</Nav.Link>
                        <Nav.Link href="#features" eventKey={2} onClick={this.handleSort} data-name="high-to-low">Sort High to Low </Nav.Link>
                        <Nav.Link href="#features" eventKey={3} onClick={this.handleSort} data-name="low-to-high">Sort Low to High </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;