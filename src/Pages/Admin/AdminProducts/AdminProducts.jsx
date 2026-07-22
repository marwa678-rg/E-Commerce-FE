import React from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  ListGroup,
  Table,
} from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { api } from "../../../API/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AdminProducts = () => {
  //Loading State
  const [loading, setLoading] = useState(false);
  //Navigation
  const navigate = useNavigate();

  return (
    <Container fluid>
      {/* ===== Header ======== */}
      <div className="header">
        <h1>Products</h1>
        <Button
          onClick={() => {
            navigate("/admin/products/add");
          }}
        >
          + Add Product
        </Button>
      </div>

      {/* ======== Search  & Filter ======= */}

      <div className="serach-filter-section">
        <div className="search-style">
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Search by product name... "
            />
            <InputGroup.Text id="inputGroup-sizing-default">
              <CiSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="dropdowen-style">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Brand
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* ========= Products - list  =========  */}
      <div className="products-table-section">
        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    </Container>
  );
};
