import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../utils/errorHandler";
import { api } from "../../API/api";
import { useEffect, useState } from "react";
import { imageUrl } from "../../utils/imageUrl";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/Slices/cartSlice";
import { Rating } from "../../Components/Rating/Rating";

export const ProductDetails = () => {
  //States
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
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
      setCartLoading(true);

      //data
      const data = {
        productId: id,
        quantity: 1,
      };
      //call Api => AddTocart
      const response = await api.post("/cart/add", data);

      //Set data in cart Redux
      dispatch(setCart(response.data?.cart));
      //Toast-Message
      toast.success(response.data.message);

      //navigate to cart page
      go("/cart");
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setCartLoading(false);
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
                    height: "500px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col className="d-flex  flex-column justify-content-center">
            <Rating
              rating={product.ratingsAverage}
              quantity={product.ratingsQuantity}
            />
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-muted fs-5 mb-0">
              {" "}
              Brand : <span className="fw-semibold">{product.brand}</span>
            </p>
            <p className="text-secondary mb-4">{product.description}</p>
            <p className="text-success fw-semibold mb-0">
              In Stock ({product.stock})
            </p>
            <div className="d-flex align-items-center gap-3">
              <span className="text-decoration-line-through  text-muted ">
                {product.price} EGP
              </span>
              {product.discountPrice > 0 && (
                <h2 className="text-success">{product.discountPrice} EGP</h2>
              )}
            </div>
            <Button size="lg" className="fw-semibold py-2" onClick={handleAddToCart} disabled={cartLoading}>
              {cartLoading ? "Adding..." : "Add To Cart"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
