import { Button, Form, Modal } from "react-bootstrap";
import { handleError } from "../../utils/errorHandler";
import { useRef, useState } from "react";
import { api } from "../../API/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/Slices/cartSlice";
import { useDispatch } from "react-redux";
export const CheckoutModal = ({ show, handleClose }) => {
  //Loading states
  const [loading, setLoading] = useState(false);

  //Use Refrences
  const fullnameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const cashRef = useRef();
  const cardRef = useRef();
  const notesRef = useRef();
  //Navigation
  const navigate = useNavigate();

  //Dispatch
  const dispatch = useDispatch();
  //___________________Handlers_____________//

  // Handle Place order
  async function handlePlaceOrder() {
    //Prepare Data
    const data = {
      shippingAddress: {
        fullName: fullnameRef.current.value,
        phoneNumber: phoneRef.current.value,
        address: addressRef.current.value,
        city: cityRef.current.value,

        notes: notesRef.current.value,
      },
      paymentMethod: cashRef.current.checked ? "cash" : "card",
    };
    setLoading(true);

    try {
      //call api=> /order/create
      const response = await api.post("/order/create", data);

      toast.success(response.data?.message);
      //Update Redux
      dispatch(clearCart());
      //Close Modal
      handleClose();
      //navigation
      navigate("/order");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Address</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/*____________ Shipping Address__________ */}
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                ref={fullnameRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="01XXXXXXX"
                ref={phoneRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="street , Buliding..."
                ref={addressRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="City">
              <Form.Label>City</Form.Label>
              <Form.Select aria-label="Default select example" ref={cityRef}>
                <option>Select Your City</option>
                <option value="Cairo"> Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Monifiya">Monifiya</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Any delivery instruction"
                ref={notesRef}
              />
            </Form.Group>

            {/*_________ payment Methods_________ */}
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>

              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="cash"
                ref={cashRef}
              />

              <Form.Check
                type="radio"
                label="Credit / Debit Card"
                name="paymentMethod"
                value="card"
                ref={cardRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handlePlaceOrder();
            }}
          >
            {loading ? "loading" : "Place Order"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
