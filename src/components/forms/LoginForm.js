import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useForm } from "../../hooks/useForm";
import InlineMessage from "../messages/InlineMessage";
import { isEmail } from "validator";
import AppContext from "../../context/appContext";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { loginUser } = useLoginUser();
  const [credentials, _, handleChange] = useForm(initialValues);

  const _validateForm = () => {
    const _errors = {};

    if (!isEmail(credentials.email)) {
      _errors.email = "Not valid email address";
    }
    if (credentials.password.length < 8) {
      _errors.password = "Password must be 8 characters long or more";
    }

    return _errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    const _errors = _validateForm();

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
    } else {
      try {
        setLoading(true);
        const response = await loginUser({
          variables: {
            ...credentials,
          },
        });

        context.userLoggedIn(response.data.login);
        history.push("/");
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            <strong className="m-required">Email address</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={(e) => handleChange(e)}
          />
          {errors.email && <InlineMessage>{errors.email}</InlineMessage>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>
            <strong className="m-required">Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => handleChange(e)}
          />
          {errors.password && <InlineMessage>{errors.password}</InlineMessage>}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
