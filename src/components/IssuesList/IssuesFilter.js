import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { useUsers } from "../../hooks/useUsers";
import { useProjects } from "../../hooks/useProjects";
import { FaFilter } from "react-icons/fa";
import useMedia from "use-media";

const IssuesFilter = ({ getFilter, issuesFilter }) => {
  const [data, , handleChange] = useForm({
    ...issuesFilter,
  });
  const { data: usersData } = useUsers();
  const { data: projectsData } = useProjects();

  const isMobile = useMedia({ maxWidth: 991 });

  const handleSubmit = (e) => {
    e.preventDefault();

    let filterObj = {};

    filterObj.status = !!data.status ? data.status : null;
    filterObj.priority = !!data.priority ? data.priority : null;
    filterObj.query = data.query;
    filterObj.projectId = data.projectId;
    filterObj.assignedToId = data.assignedToId;

    filterObj.assignedTo = !!data.assignedToId
      ? usersData.users.filter((user) => user.id === data.assignedToId)[0].name
      : "";

    filterObj.project = !!data.projectId
      ? projectsData.projects.filter(
          (project) => project.id === data.projectId
        )[0].name
      : "";

    getFilter(filterObj);
  };

  const users =
    usersData &&
    usersData.users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

  const projects =
    projectsData &&
    projectsData.projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ));

  return (
    <>
      {!isMobile && <h4 className="mb-4">Filter issues:</h4>}
      <Form onSubmit={handleSubmit} className="mb-4" id="issuesFilterForm">
        <Form.Group controlId="issue.text">
          <Form.Label>
            <strong>Query text</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text"
            name="query"
            value={data.query}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="issue.status">
          <Form.Label>
            <strong>Status</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={data.status}
            onChange={(e) => handleChange(e)}
          >
            <option value="">All statuses</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PENDING">Pending</option>
            <option value="CLOSED">Closed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="issue.priority">
          <Form.Label>
            <strong>Priority</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={data.priority}
            onChange={(e) => handleChange(e)}
          >
            <option value="">All priorities</option>
            <option value="HIGH">High</option>
            <option value="NORMAL">Normal</option>
            <option value="LOW">Low</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="issue.assignedTo">
          <Form.Label>
            <strong>User</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="assignedToId"
            value={data.assignedToId}
            onChange={(e) => handleChange(e)}
          >
            <option value="">All users</option>
            {users}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="issue.project">
          <Form.Label>
            <strong>Project</strong>
          </Form.Label>
          <Form.Control
            as="select"
            name="projectId"
            value={data.projectId}
            onChange={(e) => handleChange(e)}
          >
            <option value="">All projects</option>
            {projects}
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-end d-lg-block">
          <Button variant="info" type="submit">
            <FaFilter /> Filter
          </Button>
        </div>
      </Form>
    </>
  );
};

export default IssuesFilter;
