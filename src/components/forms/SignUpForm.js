import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useSignUpUser } from "../../hooks/useSignUpUser";
import { useForm } from "../../hooks/useForm";
import InlineMessage from "../messages/InlineMessage";
import { isEmail } from "validator";
import AppContext from "../../context/appContext";
import { useProjects } from "../../hooks/useProjects";

const initialValues = {
  name: "",
  email: "",
  password: "",
  position: "",
  projectsId: [],
};

const SignUpForm = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { signUpUser } = useSignUpUser();
  const { data } = useProjects();
  const [credentials, , handleChange] = useForm(initialValues);

  const _validateForm = () => {
    const _errors = {};

    if (credentials.name.trim() === "") {
      _errors.name = "Field is required";
    }

    if (credentials.position.trim() === "") {
      _errors.position = "Field is required";
    }

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
        const response = await signUpUser({
          variables: {
            ...credentials,
          },
        });

        context.userLoggedIn(response.data.createUser);
        setLoading(false);
        history.push("/");
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      }
    }
  };

  const projectsIdOptions =
    data &&
    data.projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ));

  return (
    <>
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="user.name">
          <Form.Label>
            <strong className="m-required">Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <InlineMessage>{errors.name}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="user.position">
          <Form.Label>
            <strong className="m-required">Position</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            name="position"
            value={credentials.position}
            onChange={(e) => handleChange(e)}
          />
          {errors.position && <InlineMessage>{errors.position}</InlineMessage>}
        </Form.Group>
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
        <Form.Group controlId="user.password">
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
        <Form.Group controlId="user.projects">
          <Form.Label>
            <strong>Assign to projects</strong>
          </Form.Label>
          <Form.Control
            as="select"
            multiple
            name="projectsId"
            onChange={(e) => handleChange(e)}
          >
            {projectsIdOptions}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
