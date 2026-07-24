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

  //Search state
  const [search, setSearch] = useState("");
  //Category state
  const [category, setCategory] = useState("");
  //Brand state
  const [brand, setBrand] = useState("");

  //======== fetch Admin Products =============//
  async function fetchAdminProducts() {
    try {
      setLoading(true);

      //Call API => api/v1/products
      const response = await api.get("/products", {
        params: { search, category, brand },
      });
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

  //Filters => Category & Brand
  useEffect(() => {
    fetchAdminProducts();
  }, [category, brand]);
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroup.Text
              id="inputGroup-sizing-default"
              onClick={fetchAdminProducts}
              style={{ cursor: "pointer" }}
            >
              <CiSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="dropdowen-style">
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
          </Form.Select>

          <Form.Select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Nike">Nike</option>
            <option value="Samsung">Samsung</option>
            <option value="Maybelline">Maybelline</option>
            <option value="Tefal">Tefal</option>
          </Form.Select>
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
                  <td>
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
                  </td>
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
