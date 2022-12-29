import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;
//Catch value from textfield
  const handleOnChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  return (
    <>
      <Form className="my-4 form-group" onSubmit>
        <Form.Group>
          {/* Username */}
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={handleOnChange}
          />
        </Form.Group>

          {/* Password */}
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={handleOnChange}
          />
        </Form.Group>

        {/* Button Submit */}
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have any account?

        {/* Register */}
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Resgister
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
