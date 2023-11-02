import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useAdminRegisterMutation } from "../slice/adminApiSlice";
import { adminSetCredentials } from "../slice/adminAuthSlice";

const AdminRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
      const [key, setKey] = useState("");

    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
        const navigate = useNavigate();
    const dispatch = useDispatch();

  const [adminRegister, { isLoading }] = useAdminRegisterMutation();

  const { adminInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

   const submitHandler = async (e) => {
     e.preventDefault();
     if (password !== confirmPassword) {
       toast.error("Password do not match");
     } else {
       try {
         const res = await adminRegister({
           name,
           email,
           password,
           key,
         }).unwrap();
         dispatch(adminSetCredentials({ ...res }));
         navigate("/admin");
       } catch (err) {
         toast.error(err?.data?.message || err.error);
       }
     }
   };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
              </Form.Group>
              
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
              </Form.Group>
              
        <Form.Group className="my-2" controlId="adminkey">
          <Form.Label>Admin Key</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></Form.Control>
              </Form.Group>
              
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            Already have an account? <Link to={`/admin/login`}>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default AdminRegisterScreen;