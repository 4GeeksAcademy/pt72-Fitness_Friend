import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [signupView, setSignupView] = useState(false);
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    last_name: "",
    height: "",
    weight: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || "",
    }));
  };

  const logInUser = (e) => {
    e.preventDefault();
    actions
      .login(formData.email, formData.password)
      .then(() => navigate('/profile'))
      .catch(() => alert("Error logging in."));
  };

  const createUser = (e) => {
    e.preventDefault();
    fetch(`${process.env.BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("User created successfully!")
        } else {
          alert("Error creating user.");
        }
      })
      .catch(() => console.log("An unexpected error occurred."));
  };

  const renderFormFields = (fields) =>
    fields.map((field) => (
      <Form.Group className="mb-3" controlId={field.name} key={field.name}>
        <Form.Control
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
        />
      </Form.Group>
    ));

  const signupFields = [
    { name: "name", type: "text", placeholder: "Name", required: true },
    { name: "last_name", type: "text", placeholder: "Last Name", required: true },
    { name: "height", type: "number", placeholder: "Height (cm)", required: true },
    { name: "weight", type: "number", placeholder: "Weight (kg)", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true },
  ];

  const loginFields = [
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true },
  ];

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ backgroundColor: "transparent", border: "none", color: "black" , padding: "0"}} >
        Login
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
          <img
                className="img-fluid"
                alt="Responsive image"
                src="https://i.imgur.com/sB3VJu2.png"
                style={{ width: "105px", marginLeft: "177px" }}
              />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signupView ? createUser : logInUser}>
            {renderFormFields(signupView ? signupFields : loginFields)}
            <Button type="submit" className="w-100" style={{backgroundColor: "#006A4E", border: "none"}}>
              {signupView ? "Sign Up" : "Log In"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            style={{textDecoration: "none", color: "#000000"}}
            onClick={() => setSignupView(!signupView)}
          >
            {signupView ? "Go to Login" : "Create New Account"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;