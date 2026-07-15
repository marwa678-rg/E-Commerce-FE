import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { imageUrl } from "../../utils/imageUrl";
import { api } from "../../API/api";
import { handleError } from "../../utils/errorHandler";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/Slices/orderSlice";
import toast from "react-hot-toast";
//CSS
import "./orderCard.css";

//Define a mapping of order status to bootstrap color classes
const statusColor = {
  pending: "warning",
  processing: "info",
  shipped: "primary",
  delivered: "success",
  cancelled: "danger",
};

export const OrderCard = ({ order }) => {
  const dispatch = useDispatch();

  //________________Handlers____________________//

  async function handleCancelOrder(orderId) {
    try {
      //call api to cancel order => /order/cancel-order/:orderId
      const response = await api.put(`/order/cancel-order/${orderId}`);

      //update the order status in UI
      dispatch(updateOrderStatus(response.data?.order));

      toast.success("Order Cancelled Successfully");
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  return (
    <>
      <Card className="mb-3">
        {/* Card Header */}
        <Card.Header>
          <Row className="align-items-center">
            <Col xs={6} md={2}>
              <small className="order-label">Order Placed</small>
              <p className="order-value">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </Col>

            <Col xs={6} md={2}>
              <small className="order-label  d-block">Status</small>
              {/* map the order status to a color using the statusColor object */}
              <Badge
                bg={statusColor[order.orderStatus]}
                className="text-dark fw-bold  rounded-pill"
              >
                {order.orderStatus}
              </Badge>
            </Col>

            <Col xs={6} md={2}>
              <small className="order-label">Total</small>
              <p className="order-value"> EGP {order.totalPrice.toFixed(2)}</p>
            </Col>

            <Col xs={6} md={2}>
              <small className="order-label">Payment</small>
              <p className="order-value">{order.paymentMethod}</p>
            </Col>

            <Col xs={6} md={2}>
              <small className="order-label">Ship to</small>
              <p className="order-value">{order.user.name}</p>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {order.items.map((item) => (
            <Row key={item._id} className="align-items-center mb-4">
              <Col xs={6} md={3}>
                <img
                  src={imageUrl(item.product?.imageCover)}
                  alt={item.product?.name}
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "cover",
                  }}
                  className="rounded shadow-md"
                />
              </Col>

              <Col xs={6} md={5} className="ms-3">
                <h5>{item.product?.name}</h5>
                <p> Quantity : {item.quantity}</p>
                <p> Price: EGP {item.priceAtPurchase}</p>
              </Col>
            </Row>
          ))}

          {order.orderStatus === "pending" && (
            <Button
              variant="outline-danger  "
              onClick={() => handleCancelOrder(order._id)}
            >
              Cancel Order
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
