import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../redux/userAuth';
import cookie from "js-cookie";


function Header() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{

        dispatch(userLogout());
        cookie.remove("token");
        navigate("/login");
  }

  return (
    <Navbar expand="lg" bg="dark" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as = {Link} to="/">RestroApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as = {Link} to="/">Home</Nav.Link>
            <Nav.Link as = {Link} to="/about">About</Nav.Link>
            <Nav.Link as = {Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as = {Link} to="/add">Add</Nav.Link>
            <Nav.Link as = {Link} to="/register">Register</Nav.Link>
            <Nav.Link as = {Link} to="/users">Users</Nav.Link>
            
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated ? <Button onClick={handleLogout}>Logout</Button> :  <Nav.Link as = {Link} to="/login">
              <Button>Login</Button>
              </Nav.Link>}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;