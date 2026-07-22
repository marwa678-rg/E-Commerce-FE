import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
//CSS
import "./adminNavbar.css";
export const AdminNavbar = () => {
  //User from Redux
  const user = useSelector((state) => state.user.user);

  return (
    <Navbar className="admin-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/admin" className="navbar_brand">
          ShopSphere
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-3">
          <Nav.Link>
            <IoIosNotificationsOutline
              size={26}
              className="notification-icon"
            />{" "}
          </Nav.Link>
          <Nav.Link>
            <span>Welcome,</span>
            <strong>{user?.name}</strong>{" "}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
