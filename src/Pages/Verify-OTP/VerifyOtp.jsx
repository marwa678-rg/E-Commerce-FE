import { useEffect, useRef } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../utils/errorHandler";
import { api } from "../../API/api";

export const VerifyOtp = () => {
  //Navigation
  const navigate = useNavigate();

  //Refs
  const otpRef = useRef(null);
  //Get Verify Email
  const storedEmail = localStorage.getItem("verifyEmail");
  //check stored email
  useEffect(() => {
    if (!storedEmail) {
      navigate("/register");
    }
  }, [storedEmail, navigate]);

  //___________________Handlers__________________//


  //*** SUBMIT FORM ***//
  async function handleSubmit(e) {
    e.preventDefault();
    //Data

    const otp = otpRef.current.value;
    const email = storedEmail;

    //check otp
    if (!otp) {
      toast.error("Please enter otp");
      return;
    }
    try {
      //Call api => /auth/verify-otp
      const response = await api.post("/auth/verify-otp", { otp, email });
      toast.success(response.data?.message);

      //clear verify email
      localStorage.removeItem("verifyEmail");

      //navigate Login Route
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  }


  //*** Handle Resend Otp***/
async function handleResendOtp(){
try {
  
  //Call API => /auth/resendOtp
  const response = await api.post("/auth/resendOtp",{email:storedEmail})

  toast.success(response.data?.message);
} catch (error) {
  handleError(error);
}


}

  return (
    <>
      <Container fluid="md" className="mt-5  pt-5">
        <h1 className="fw-bold m-5 text-center">Verification</h1>
        <Row className="justify-content-center align-items-center h-100">
          <Col sm={10} md={8} lg={5}>
            <div className="shadow rounded p-4 bg-white">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      value={storedEmail || ""}
                      readOnly
                    />
                    <InputGroup.Text>
                      <MdAlternateEmail />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">OTP</Form.Label>
                  <Form.Control
                    type="text"
                    ref={otpRef}
                    placeholder="Enter 6-digits code"
                    required
                  ></Form.Control>
                </Form.Group>
                <div className="d-flex mt-5 justify-content-center">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-100 rounded-pill"
                  >
                    Verify
                  </Button>
                </div>
              
              </Form>

  <div className="text-center mt-3">
                  <small className="text-muted">
                    Didn't receive the code ? {""}
                    <button type="button" onClick={handleResendOtp}>
                      Resend OTP
                    </button>
                  </small>
                </div>

            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
