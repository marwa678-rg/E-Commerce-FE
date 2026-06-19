import { useRef } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import { handleError } from "../../utils/errorHandler";
import { api } from "../../API/api";

export const ForgotPassword = () => {
  //Refs
  const emailRef = useRef(null);

  //___________________Handlers_____________//
  async function handleSubmit(e) {
    e.preventDefault();

    //Data
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      //Call api => auth/forgotPassword
      const response = await api.post("/auth/forgotPassword", { email });

      toast.success(response.data?.message);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <>
      <Container fluid="md" className="mt-5  pt-5">
        <h1 className="fw-bold m-5 text-center">Forgot Password</h1>
        <Row className="justify-content-center align-items-center h-100">
          <Col sm={10} md={8} lg={5}>
            <div className="shadow rounded p-4 bg-white">
              <h1>Reset your password</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      placeholder="name@gmail.com"
                      ref={emailRef}
                    />
                    <InputGroup.Text>
                      <MdAlternateEmail />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div className="d-flex mt-5 justify-content-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 rounded-pill"
                  >
                    Send Reset Link
                  </Button>
                </div>
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Enter your email and we'll send you a password reset link.
                  </small>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
