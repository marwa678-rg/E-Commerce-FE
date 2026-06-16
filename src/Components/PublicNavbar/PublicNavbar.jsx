import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PublicNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
        <Container>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="fw-bold brand-logo ">
            shopsphere
          </Navbar.Brand>
          {/* Mobile Toggle */}
          <Navbar.Toggle aria-controls="public-navbar" />
          <Navbar.Collapse id="public-navbar" className="justify-content-end">
            <Nav className="align-items-center gap-2">
              <Nav.Link href="#Home" className="nav-link">
                Home
              </Nav.Link>

              <Nav.Link href="#register" className="nav-link">
                Register
              </Nav.Link>

              <Nav.Link href="login" className="nav-link">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
