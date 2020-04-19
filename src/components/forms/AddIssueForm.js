import React, { Fragment, useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import InlineMessage from "../messages/InlineMessage";
import { useProjects } from "../../hooks/useProjects";
import { useUsers } from "../../hooks/useUsers";
import { useForm } from "../../hooks/useForm";
import { useCreateIssue } from "../../hooks/useCreateIssue";

const initialValues = {
  title: "",
  description: "",
  priority: "NORMAL",
  estimation: "",
  status: "NEW",
  assignedToId: "Unassigned",
  projectId: "",
};

const AddIssueForm = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
    refetch: projectsRefetch,
  } = useProjects();
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: usersRefetch,
  } = useUsers();
  const [issueData, setData, handleChange] = useForm(initialValues);
  const { createIssue } = useCreateIssue();

  useEffect(() => {
    projectsRefetch();
    usersRefetch();
  }, []);

  if (projectsLoading) return <div>Loading...</div>;
  if (projectsError) return `Error! ${projectsError.message}`;

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return `Error! ${usersError.message}`;

  const projectsId =
    projectsData &&
    projectsData.projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ));

  const assignedToId =
    usersData &&
    usersData.users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

  const _validateForm = () => {
    const _errors = {};

    if (issueData.title.trim() === "") {
      _errors.title = "Required field";
    }
    if (issueData.description.trim() === "") {
      _errors.description = "Required field";
    }
    if (issueData.estimation.trim() === "") {
      _errors.estimation = "Required field";
    } else if (isNaN(issueData.estimation)) {
      _errors.estimation = "Not a number";
    }
    if (issueData.projectId === "") {
      _errors.projectId = "Select project";
    }

    return _errors;
  };

  const _resetFields = () => {
    setData(initialValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsAdded(false);
    setErrors({});
    const _errors = _validateForm();

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
    } else {
      try {
        setIsAdding(true);
        await createIssue({
          variables: {
            ...issueData,
            estimation: issueData.estimation * 60,
            status: "NEW",
          },
        });
        setIsAdding(false);
        setIsAdded(true);
        _resetFields();
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
        window.scroll(0, 0);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return (
    <Fragment>
      {isAdded && <Alert variant="success">Issue added!</Alert>}
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="issue.title">
          <Form.Label>
            <strong className="m-required">Title</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={issueData.title}
            onChange={(e) => handleChange(e)}
          />
          {!!errors.title && <InlineMessage>{errors.title}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="issue.description">
          <Form.Label>
            <strong className="m-required">Description</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            name="description"
            value={issueData.description}
            onChange={(e) => handleChange(e)}
          />
          {!!errors.description && (
            <InlineMessage>{errors.description}</InlineMessage>
          )}
        </Form.Group>
        <Form.Group controlId="issue.priority">
          <Form.Label>
            <strong className="m-required">Priority</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={issueData.priority}
            onChange={(e) => handleChange(e)}
          >
            <option value="HIGH">High</option>
            <option value="NORMAL">Normal</option>
            <option value="LOW">Low</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="issue.estimation">
          <Form.Label>
            <strong className="m-required">Estimation</strong>(in hours: 2, 0.5)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter estimation"
            name="estimation"
            value={issueData.estimation}
            onChange={(e) => handleChange(e)}
          />
          {!!errors.estimation && (
            <InlineMessage>{errors.estimation}</InlineMessage>
          )}
        </Form.Group>
        <Form.Group controlId="issue.status">
          <Form.Label>
            <strong className="m-required">Status</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={issueData.status}
            onChange={(e) => handleChange(e)}
          >
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PENDING">Pending</option>
            <option value="CLOSED">Closed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="issue.project">
          <Form.Label>
            <strong className="m-required">Project</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="projectId"
            value={issueData.projectId}
            onChange={(e) => handleChange(e)}
          >
            <option value="" disabled hidden>
              select project
            </option>
            {projectsId}
          </Form.Control>
          {!!errors.projectId && (
            <InlineMessage>{errors.projectId}</InlineMessage>
          )}
        </Form.Group>
        <Form.Group controlId="issue.assignedTo">
          <Form.Label>
            <strong>Assigned to</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="assignedToId"
            value={issueData.assignedToId}
            onChange={(e) => handleChange(e)}
          >
            <option value="Unassigned" disabled hidden>
              Unassigned
            </option>
            {assignedToId}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add"}
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddIssueForm;
