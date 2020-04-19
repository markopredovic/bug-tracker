import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import InlineMessage from "../messages/InlineMessage";
import { useForm } from "../../hooks/useForm";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useUsers } from "../../hooks/useUsers";

const initialValues = {
  name: "",
  description: "",
  ids: [],
};

const AddProjectForm = () => {
  const [errors, setErrors] = useState({});
  const [adding, setAdding] = useState(false);
  const [projectAdded, setProjectAdded] = useState(false);

  const [data, setData, handleChange] = useForm(initialValues);
  const { createProject } = useCreateProject();

  const { loading, error, data: users } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const allUsers =
    !!users &&
    users.users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

  const _validateForm = () => {
    const _errors = {};

    if (data.name.trim() === "") {
      _errors.name = "Required field";
    }

    if (data.description.trim() === "") {
      _errors.description = "Required field";
    }

    return _errors;
  };

  const _resetFormFields = () => {
    setData({ name: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProjectAdded(false);
    setErrors({});
    const _errors = _validateForm();

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
    } else {
      try {
        setAdding(true);

        let newProjectData = {
          name: data.name,
          description: data.description,
          teamIds: data.ids,
        };

        await createProject({
          variables: {
            ...newProjectData,
          },
        });
        setAdding(false);
        setProjectAdded(true);
        _resetFormFields();
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      } finally {
        setAdding(false);
      }
    }
  };

  return (
    <>
      {projectAdded && <Alert variant="success">Project Added!</Alert>}
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit} id="addProjectForm">
        <Form.Group controlId="project.name">
          <Form.Label>
            <strong className="m-required">Project name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => handleChange(e)}
          />
          {!!errors.name && <InlineMessage>{errors.name}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="project.description">
          <Form.Label>
            <strong className="m-required">Project description</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter description"
            rows="4"
            value={data.description}
            onChange={(e) => handleChange(e)}
          />
          {!!errors.description && (
            <InlineMessage>{errors.description}</InlineMessage>
          )}
        </Form.Group>
        <Form.Group controlId="project.team">
          <Form.Label>
            <strong>Select team</strong>
          </Form.Label>
          <Form.Control
            as="select"
            multiple
            name="ids"
            value={data.ids}
            onChange={(e) => handleChange(e)}
          >
            {allUsers}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add"}
        </Button>
      </Form>
    </>
  );
};

export default AddProjectForm;
