import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../utils/errorHandler";
import { api } from "../../API/api";
import { useEffect, useState } from "react";
import { imageUrl } from "../../utils/imageUrl";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/Slices/cartSlice";

export const ProductDetails = () => {
  //States
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  //cart-redux
  const dispatch = useDispatch();

  //Navigation
  const go = useNavigate();
  //Params
  const { id } = useParams();

  //Call Product/:id
  useEffect(() => {
    async function getSingleProduct() {
      try {
        setLoading(true);
        //Call Api => /products/:id
        const response = await api.get(`/products/${id}`);

        console.log(response.data?.product);
        setProduct(response.data?.product);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    //call function
    getSingleProduct();
  }, [id]);

  //_________Handler__________//
  async function handleAddToCart() {
    try {
      setLoading(true);

     
      //data
      const data = {
        productId: id,
        quantity:1,
      };
      //call Api => AddTocart
      const response = await api.post("/cart/add", data);

      console.log(response.data?.cart);
      //Set data in cart Redux
      dispatch(setCart(response.data?.cart));
      //Toast-Message
      toast.success(response.data.message);

      //navigate to cart page
       go("/cart")
    } catch (error) {
      console.log(error);
      handleError(error);
    }finally{
      setLoading(false)
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Container className="w-100 mt-5">
        <Row className="d-flex g-5 align-items-center">
          <Col md={6} className="d-flex flex-column justify-content-center">
            <Carousel>
              <Carousel.Item>
                <img
                  className="img-fluid rounded shadow-sm"
                  src={imageUrl(product.imageCover)}
                  alt={product.name}
                  style={{
                    height: "550px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col className="d-flex  flex-column justify-content-center">
            <h2>{product.name}</h2>
            <h3>{product.brand}</h3>
            <p>{product.description}</p>
            <h3 className="fw-bold text-success">{product.price} EGP</h3>

            <Button onClick={handleAddToCart}>Add To Cart</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
