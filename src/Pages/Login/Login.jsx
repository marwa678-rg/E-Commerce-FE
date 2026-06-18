import { useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../../utils/errorHandler";
import { api } from "../../API/api";
import toast from "react-hot-toast";

export function Login() {
  //States
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  //navigation
  const navigate = useNavigate();

  //Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //_____________Handlers_______________//

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    //Data
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      //Call Api => auth/login
      const response = await api.post("/auth/login", data);

      toast.success(response.data?.message);

      //Save Token
      localStorage.setItem("token", response.data.token);

      //update user in Redux

      //navigate
      navigate("/");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container fluid="md" className="mt-5  pt-5">
        <h1 className="fw-bold m-5 text-center">Login</h1>
        <Row className="justify-content-center align-items-center h-100">
          <Col sm={10} md={8} lg={5}></Col>
          <div className="shadow rounded p-4 bg-white">
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
                  disapbled={loading}
                >
                  {loading ? "Logging in ... " : "Login"}
                </Button>
              </div>
            </Form>
            {/* Forgot-Password */}
      <div className='text-center mt-3'>
              <small className='text-muted'>
                Forgot your password ?{" "}
              </small>
                 <span
                        style={{
                          color: "#7c3aed",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/forgotPassword")}
                      >
                        Forgot-Password 
                      </span>

            </div>

            <div className="text-center mt-3">
  <small className="text-muted">
    Don’t have an account?{" "}
    <Link to="/register" style={{ color: "#7c3aed", fontWeight: 600 }}>
      Sign up
    </Link>
  </small>
</div>




          </div>

         


        </Row>
      </Container>
    </>
  );
}
