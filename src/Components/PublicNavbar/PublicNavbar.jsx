import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/Slices/UserSlice";
import { TiShoppingCart } from "react-icons/ti";
import { BsBox2Heart } from "react-icons/bs";
import "./PublicNavbar.css";
export const PublicNavbar = () => {
  //User States
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  //Dispatch => userRedux
  const dispatch = useDispatch();

  //Cart Redux
  const cart = useSelector((state) => state.cart.cart);

  //navigation
  const navigate = useNavigate();
  //cart count badge
  const cartCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  //______________________Handlers_____________//
  function handleLogout() {
    localStorage.removeItem("token");

    dispatch(logout());
    navigate("/login");
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
                  <Navbar.Text>Welcome {user?.name}</Navbar.Text>
                  {(user?.role === "admin" || user?.role === "super_admin") && (
                    <Nav.Link as={Link} to="/admin">
                      Admin Dashboard
                    </Nav.Link>
                  )}

                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

                  <NavLink as={Link} to="/order" title="Orders">
                    <BsBox2Heart style={{ fontSize: "20px" }} />
                  </NavLink>

                  <Nav.Link as={Link} to="/cart" title="Cart">
                    <div className="cart-icon">
                      {" "}
                      <TiShoppingCart size={30} />
                      {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                      )}
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" title="login">
                    Login
                  </Nav.Link>

                  <Nav.Link as={Link} to="/register" title="Register">
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
