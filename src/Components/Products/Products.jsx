import { Col, Container, Row } from "react-bootstrap";
import { api } from "../../API/api";
import { handleError } from "../../utils/errorHandler";
import { useEffect, useState } from "react";
import { ProductCard } from "../Product-Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/Slices/productSlice";

export const Products = () => {
  //States
  const [loading, setLoading] = useState(false);
  //Redux
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  //Fetch Products

  async function fetchProducts() {
    try {
      setLoading(true);
      //Call Api => /products
      const response = await api.get("/products");
      dispatch(setProducts(response.data?.products));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container className="my-5  pt-4">
      <h1 className="fw-bold mb-4">Latest Products</h1>
      <Row className="g-2">
        {products.map((product) => (
          <Col xs={6} sm={4} md={3} lg={2} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
