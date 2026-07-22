import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../Components/AdminSidebar/AdminSidebar";
import { Col, Container, Row } from "react-bootstrap";
import { AdminNavbar } from "../Components/AdminNavbar/AdminNavbar";
export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminSidebar />
          </Col>
          <Col md={10}>
            <main className="admin-main">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
};
