import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../API/api";
import { handleError } from "../../utils/errorHandler";
import { setOrders } from "../../store/Slices/orderSlice";
import { OrderCard } from "../../Components/OrderCard/OrderCard";

export const Orders = () => {
  //Loading State
  const [loading, setLoading] = useState(false);
  //search state => search-Input
  const [search, setSearch] = useState("");

  //Dispatch
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  async function fetchOrders() {
    setLoading(true);

    try {
      const response = await api.get("/order/my-orders", {
        params: { search },
      });

      dispatch(setOrders(response.data.orders));
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      {/*_________________________ Header__________________________ */}
      <Row className="align-items-center mb-4  mt-3">
        <Col>
          <h1 className="fw-bold mb-0">Your Orders</h1>
        </Col>
        <Col md={5}>
          <InputGroup>
            <Form.Control
              placeholder="search all your orders"
              aria-label="search all your orders"
              aria-describedby="basic-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="primary"
              id="button-addon2"
              disabled={loading}
              onClick={fetchOrders}
            >
              search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <hr />
      {/*__________________________  Show orders _____________________________ */}
      <Row>
        <Col>
          {orders.length === 0 ? (
            <p> No Orders Found</p>
          ) : (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          )}
        </Col>
      </Row>
    </Container>
  );
};
