//Imports

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../utils/errorHandler";
import { useEffect, useState } from "react";
import { api } from "../../API/api";
import { setCart } from "../../store/Slices/cartSlice";
import { CartItem } from "../../Components/CartItem/CartItem";
import emptyCart from "../../assets/Images/undraw_empty-cart_574u.svg";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export const Cart = () => {
  //States
  const [loading, setLoading] = useState(false);
  //Dispatch & useSelector =>Redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  //Navigation
  const navigate = useNavigate();
  //__________Fetch MY-CART_______________//
  useEffect(() => {
    async function getMyCart() {
      setLoading(true);
      try {
        //call API =>/cart/my-cart
        const response = await api.get("/cart/my-cart");
        console.log(response.data?.cart);
        dispatch(setCart(response.data?.cart));
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
    if (!cart) {
      getMyCart();
    }
  }, [cart, dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  //Empty cart page
  if (cart && cart.items.length === 0) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center text-center py-5"
        style={{ minHeight: "85vh" }}
      >
        <img
          src={emptyCart}
          alt="Empty Cart"
          className="img-fluid mb-4"
          style={{ maxWidth: "450px", width: "100%" }}
        />

        <h1 className="mt-4 fw-bold mt-4">
          {" "}
          <BsCart4 /> Your Cart is Empty
        </h1>
        <p className="text-muted fs-5 fw-light">
          looks like you haven't added any products yet.
          <br />
          Start Shopping to fill your Cart!
        </p>
        <Button
          variant="primary"
          className="mt-3 rounded-pill px-5 py-3"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          <h1 className="mb-4"> My Cart</h1>
          {cart?.items?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </Col>
        {/* Order Summary */}
        <Col lg={4}>
          <Card
            className="shadow-sm rounded-4 p-2"
            style={{ position: "sticky", top: "90px" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Order Summary</h4>
                <span className="badge bg-light text-dark rounded-pill">
                  {cart?.items?.length} Items
                </span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>EGP {cart?.totalPrice?.toLocaleString()}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping Fee</span>

                <div>
                  <span className="text-decoration-line-through text-muted me-2">
                    EGP 20.00
                  </span>
                  <span className="text-success fw-bold">FREE</span>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between  mb-4">
                <h4>Total</h4>
                <h4 className="fw-bold">
                  EGP {cart?.totalPrice?.toLocaleString()}
                </h4>
              </div>

              <button className="btn btn-primary w-100 rounded-pill py-3">
                Checkout
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
