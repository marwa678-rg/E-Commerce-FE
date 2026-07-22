import React from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
//CSS
import "./adminSidebar.css";

export const AdminSidebar = () => {
  return (
    <>
      <div className="admin-sidebar">
        <h2>ShopSphere</h2>

        <Nav className="flex-column  sidebar-links">
          <NavLink className="nav-link" to="/admin">
            <MdDashboard /> Dashboard
          </NavLink>
          <NavLink   className="nav-link" to="/admin/products">
            <MdInventory /> Products
          </NavLink>
          <NavLink  className="nav-link"    to="/admin/order">
            <MdShoppingBag /> Orders
          </NavLink>
        </Nav>
      

      <Button className="logout_button">
        <MdOutlineLogout /> Logout
      </Button>
      </div>
    </>
  );
};
