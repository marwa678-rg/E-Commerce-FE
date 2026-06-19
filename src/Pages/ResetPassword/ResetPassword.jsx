import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../utils/errorHandler";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../API/api";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  //States
  const [showPass, setShowPass] = useState(false);

  //navigate
  const navigate = useNavigate();

  //get Token from params
  const { token } = useParams();

  //check Token
  useEffect(() => {
    if (!token) {
      toast.error("Invalid Reset Link");
      //navigate
      navigate("/register");
      return;
    }
  }, [token, navigate]);

  //Refs
  const passwordRef = useRef(null);

  //____________Handlers___________________//
  async function handleSubmit(e) {
    e.preventDefault();

    const newPassword = passwordRef.current.value;

    if (!newPassword) {
      toast.error("Please enter password");
      return;
    }
    //data
    const data = {
      token,
      newPassword,
    };

    try {
      //Call Api =>  auth/resetPassword
      const response = await api.post("/auth/resetPassword", data);

      toast.success(response.data?.message);

      //navigate
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <>
      <Container fluid="md" className="mt-5  pt-5">
        <Row className="justify-content-center align-items-center h-100">
          <Col sm={10} md={8} lg={5}>
            <div className="shadow rounded p-4 bg-white">
              <h2 className="text-center mb-4">Create New Password</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPass ? "text" : "password"}
                      placeholder="password"
                      ref={passwordRef}
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                    >
                      {showPass ? <FaEye /> : <FaEyeSlash />}
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
                    Reset Password
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
