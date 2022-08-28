/* eslint-disable */
import './App.css';
import {useState} from "react";
import { Row, Col, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Data from './data';


function App() {

    let [shoes] = useState(Data);
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" className="logo">ReactShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Notice</Nav.Link>
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Product1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Product2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Product3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">All Products</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="main-img"></div>

            <Container>
                <Row>
                    {
                        shoes.map((k, i) => {
                            return(
                                <Product shoes={shoes[i]} i={i} key={i}/>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    );
}
function Product(props) {
    return(
        <Col sm className="item-list">
            <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1)+'.jpg'} style={{"width": "80%"}}/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
            <span>{props.shoes.price}</span>
        </Col>
    )
}

export default App;
