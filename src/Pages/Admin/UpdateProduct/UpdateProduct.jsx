import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../../../utils/errorHandler';
import { api } from '../../../API/api';
import { Button, Form, Row } from 'react-bootstrap';

export const UpdateProduct = () => {
const navigate = useNavigate();
const {id} = useParams(); 

const [product,setProduct]= useState({
  name:"",
  description:"",
  price:"",
  discountPrice:"",
  brand:"",
  category:"",
  stock:"",
})
//============ Fetch One Product By Id =============//
async function fetchProductById(){
  try {
    //call api => api/v1/products/:id
    const response = await api.get(`/products/${id}`)
console.log(response.data.product)
// to handle data required 
  const fetchedProduct = response.data?.product;
  setProduct({
   name: fetchedProduct.name,
  description: fetchedProduct.description,
  price: fetchedProduct.price,
  discountPrice: fetchedProduct.discountPrice,
  brand: fetchedProduct.brand,
  category: fetchedProduct.category,
  stock: fetchedProduct.stock,
  })
    
  } catch (error) {
    handleError(error);
  }
}

useEffect(()=>{
fetchProductById();
},[id])






//========== Handlers ==============//
function handleChange(e) {
  setProduct({
    ...product,
    [e.target.name]: e.target.value,
  });
}
//Update Product
async function updateProduct() {
  try {
    const response = await api.put(
      `/products/update/${id}`,
      product
    );

    console.log(response.data?.product);
navigate("/admin/products")
  } catch (error) {
    handleError(error);
  }
}
  return (
    <>
  <div className="form-style">
  <Form>
    <Form.Group as={Row} className="mb-3">
      <Form.Label>Product Name</Form.Label>
      <Form.Control
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        name="description"
        value={product.description}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        min={0}
        name="price"
        value={product.price}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label>Discount Price</Form.Label>
      <Form.Control
        type="number"
        min={0}
        name="discountPrice"
        value={product.discountPrice}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label>Stock</Form.Label>
      <Form.Control
        type="number"
        min={0}
        name="stock"
        value={product.stock}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label>Brand</Form.Label>
      <Form.Control
        type="text"
        name="brand"
        value={product.brand}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Form.Select
        name="category"
        value={product.category}
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
    </Form.Group>

    <Button
      variant="primary"
      onClick={updateProduct}
    >
      Update Product
    </Button>
  </Form>
</div>
    
    
    
    
    </>
  )
}
