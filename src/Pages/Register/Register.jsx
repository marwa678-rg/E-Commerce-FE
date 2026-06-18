import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { MdAlternateEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { api } from "../../API/api";
import { handleError } from "../../utils/errorHandler";
import toast from "react-hot-toast";
import { Loading } from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //Navigation
  const navigate = useNavigate();
  //States
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  //Refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //_________Handlers_______________
  async function handleSubmit(e) {
    e.preventDefault();
    //loading =>true
    setLoading(true);

    //Data
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    //EndPoint => /auth/register
    try {
      //Call Api
      const response = await api.post("/auth/register", data);
      //save email in storage
      localStorage.setItem("verifyEmail", data.email);

      toast.success(response.data?.message);
      //wait until see toast
      setTimeout(() => {
        navigate("/verify-otp");
      }, 800);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Container fluid="md" className="mt-5  pt-5">
        <h1 className="fw-bold m-5 text-center">Shopsphere Seller Central</h1>

        <Row className="justify-content-center align-items-center h-100">
          <Col sm={10} md={8} lg={5}>
            <div className="shadow rounded p-4 bg-white">
              <h1>Create account</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control type="text" ref={nameRef}></Form.Control>
                </Form.Group>
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
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-100 rounded-pill"
                  >
                    Register
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
