import Logo from "./Logo.png"
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar =()=>{
      return (
            <div>
                <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor:'#B00000'}}>
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                            alt="Uinderal Logo"
                            src={Logo}
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                            
                            />{''}
                            Uinderal
                        </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                </Nav>
                                <Nav>
                                <Link to="/wiki" class="nav-links">Wiki</Link>
                                <Link to="/about" class="nav-links">What is Uinderal?</Link>
                                </Nav>
                            </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
      )
}
export default NavigationBar;