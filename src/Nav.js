import React, { Component } from 'react';
import {Nav, NavDropdown, Navbar, Container} from "react-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);

    }
    handleFavoriteClick() {
        this.props.openFavModal();
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
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;