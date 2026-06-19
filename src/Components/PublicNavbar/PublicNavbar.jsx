import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/Slices/UserSlice";

export const PublicNavbar = () => {
//User States
const isLoggedIn = useSelector((state)=> state.user.isLoggedIn)
const user = useSelector((state)=>state.user.user)
//Dispatch
const dispatch = useDispatch();
//navigation
const navigate = useNavigate();

//______________________Handlers_____________//
 function handleLogout(){
localStorage.removeItem("token")

dispatch(logout())
navigate("/login")
 }


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


             {isLoggedIn ? (
              <>
              <Navbar.Text>
                Welcome {user?.name}
              </Navbar.Text>

              <Nav.Link onClick={handleLogout}>
                Logout
              </Nav.Link>
              
              </>
             ) : (
              <>
               <Nav.Link as={Link} to="/login">
      Login
    </Nav.Link>

    <Nav.Link as={Link} to="/register">
      Register
    </Nav.Link>
              </>
             )}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
