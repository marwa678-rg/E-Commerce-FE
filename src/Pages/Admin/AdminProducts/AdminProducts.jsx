import React, { useEffect } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { api } from "../../../API/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleError } from "../../../utils/errorHandler";
import { imageUrl } from "../../../utils/imageUrl";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export const AdminProducts = () => {
  //Loading State
  const [loading, setLoading] = useState(false);
  //Navigation
  const navigate = useNavigate();

  //products state
  const [products, setProducts] = useState([]);

  //======== fetch Admin Products =============//
  async function fetchAdminProducts() {
    try {
      setLoading(true);

      //Call API => api/v1/products
      const response = await api.get("/products");
      //set products
      setProducts(response.data?.products);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAdminProducts();
  }, []);

  //_________Delete Product _____________//
  async function deleteProduct(id) {
    try {
      //call API => api/v1/delete/:id
      await api.delete(`/products/delete/${id}`);
      //Update UI
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      handleError(error);
    }
  }

  if (loading) return <h1>Loading...</h1>;
  return (
    <Container fluid>
      {/* ===== Header ======== */}
      <div className="header">
        <h1>Products</h1>
        <Button>+ Add Product</Button>
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
              <th>discount price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {" "}
                    <img
                      src={imageUrl(product.imageCover)}
                      alt={product.name}
                      width={50}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.price} EGP</td>
                  <td>{product.discountPrice} EGP</td>
                  <td>{product.stock} </td>
                  <Button
                    onClick={() => {
                      navigate(`/admin/products/update/${product._id}`);
                    }}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Product not found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
