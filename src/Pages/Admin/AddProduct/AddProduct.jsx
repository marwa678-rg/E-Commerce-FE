import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { handleError } from "../../../utils/errorHandler";
import { api } from "../../../API/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AddProduct = () => {
  //Navigation
  const navigate = useNavigate();

  //Loading States
  const [loading, setLoading] = useState(false);

  //Form States
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
    brand: "",
    imageCover: null,
    images: [],
  });

  //______________ Handlers _________________//

  function handleChange(e) {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCoverImage(e) {
    setProductData((prev) => ({ ...prev, imageCover: e.target.files[0] }));
  }

  function handleImages(e) {
    setProductData((prev) => ({
      ...prev,
      images: [...e.target.files],
    }));
  }

  //Add Product Function
  async function addProduct(e) {
    e.preventDefault();
    //Check imageCover
    if (!productData.imageCover) {
      toast.error("Image Cover is required");

      return;
    }

    try {
      setLoading(true);

      //Prepare Data

      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("discountPrice", productData.discountPrice);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("brand", productData.brand);

      // Cover Image
      formData.append("imageCover", productData.imageCover);

      // Multiple Images
      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      //Call Api => api/v1/products/create
      const response = await api.post("/products/create", formData);

      toast.success(response.data.message);

      //navigate
      navigate("/admin/products");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="d-flex">
      <div>
        <h1>Add New Product </h1>
      </div>
      <div className="form-style">
        <Form onSubmit={addProduct}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label> Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nike Air Max"
              value={productData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              name="price"
              placeholder="1500"
              value={productData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label>Discount Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min={0}
              placeholder="25"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              placeholder="Nike"
              value={productData.brand}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Select
            aria-label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Choose Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
          </Form.Select>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleCoverImage}
            />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Product Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
            />
          </Form.Group>
          <Button type="submit" className="creat-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};
